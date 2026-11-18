import express from 'express';
import dotenv from 'dotenv';
import { EventEmitter } from 'events';
import { prisma } from './prisma';
import enquiryRoutes from './routes/enquiryRoutes';
import serviceRoutes from './routes/serviceRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/enquiries', enquiryRoutes);
app.use('/api', serviceRoutes);

interface MockResponse {
  statusCode: number;
  headers: Record<string, string | string[]>;
  body: any;
  text: string;
}

function dispatch(options: {
  method?: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
}): Promise<MockResponse> {
  return new Promise((resolve) => {
    const method = (options.method || 'GET').toUpperCase();
    const url = options.url;
    const reqHeaders: Record<string, string> = {
      'content-type': 'application/json',
      ...(options.headers || {})
    };

    const req: any = new EventEmitter();
    req.method = method;
    req.url = url;
    req.headers = reqHeaders;
    req.rawHeaders = Object.entries(reqHeaders).flat();
    req.query = {};
    req.params = {};
    req.body = options.body || {};
    req.socket = { remoteAddress: `127.0.0.${Math.floor(1 + Math.random() * 250)}` };
    req.connection = req.socket;

    const resHeaders: Record<string, any> = {};
    let statusCode = 200;
    const chunks: Buffer[] = [];

    const res: any = new EventEmitter();
    res.statusCode = 200;
    res.setHeader = (name: string, value: any) => {
      resHeaders[name.toLowerCase()] = value;
      return res;
    };
    res.getHeader = (name: string) => resHeaders[name.toLowerCase()];
    res.status = (code: number) => {
      statusCode = code;
      res.statusCode = code;
      return res;
    };
    res.send = (data: any) => {
      if (typeof data === 'object' && !Buffer.isBuffer(data)) {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(data));
      } else {
        res.end(data);
      }
      return res;
    };
    res.json = (data: any) => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
    res.end = (chunk?: any) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      const fullText = Buffer.concat(chunks).toString('utf-8');
      let parsedBody: any = fullText;
      try {
        parsedBody = JSON.parse(fullText);
      } catch {}

      resolve({
        statusCode,
        headers: resHeaders,
        body: parsedBody,
        text: fullText
      });
    };

    app(req, res);
  });
}

async function runTests() {
  console.log('========================================================');
  console.log('   DILIP VISUALS — PUBLIC CONTACT & ENQUIRY API TESTS   ');
  console.log('========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, title: string) {
    if (condition) {
      console.log(`[PASS] ${title}`);
      passed++;
    } else {
      console.error(`[FAIL] ${title}`);
      failed++;
    }
  }

  let createdEnquiryNum = '';

  try {
    // 1. Validation test: Missing required fields
    const resMissing = await dispatch({
      method: 'POST',
      url: '/api/enquiries',
      body: { name: '', email: 'invalid' }
    });
    assert(resMissing.statusCode === 400, 'Rejects empty submission with HTTP 400');

    // 2. Validation test: Invalid email
    const resBadEmail = await dispatch({
      method: 'POST',
      url: '/api/enquiries',
      body: { 
        name: 'John Doe', 
        email: 'notanemail', 
        phone: '+919398769483', 
        service: 'Professional Video Editing',
        description: 'Test project description'
      }
    });
    assert(resBadEmail.statusCode === 400 && resBadEmail.body.error.includes('valid email'), 'Validates email format');

    // 3. Successful enquiry submission with all required fields
    const testEmail = `creator.${Date.now()}@gmail.com`;
    const resSuccess = await dispatch({
      method: 'POST',
      url: '/api/enquiries',
      body: {
        name: 'Arjun Verma',
        email: testEmail,
        phone: '+91 9876543210',
        company: 'Apex Media Studio',
        service: 'Professional Video Editing',
        budgetRange: '₹30,000 – ₹60,000',
        expectedDeadline: 'Within 2 Weeks',
        description: 'Looking for a high-retention video editor for a 10-episode documentary series.',
        preferredContact: 'whatsapp'
      }
    });

    assert(resSuccess.statusCode === 201, 'Accepts valid enquiry with HTTP 201 Created');
    assert(Boolean(resSuccess.body.enquiryNumber), `Returns readable Enquiry Number (${resSuccess.body.enquiryNumber})`);
    createdEnquiryNum = resSuccess.body.enquiryNumber;

    // 4. Verify Database Persistence in Prisma
    const dbRecord = await prisma.enquiry.findUnique({
      where: { enquiryNumber: createdEnquiryNum }
    });
    assert(Boolean(dbRecord), 'Enquiry stored in SQLite/Postgres database');
    assert(dbRecord?.email === testEmail, 'Database record matches submitted email');
    assert(dbRecord?.service === 'Professional Video Editing', 'Database record matches selected service');

    // 5. Anti-spam honeypot test
    const resSpam = await dispatch({
      method: 'POST',
      url: '/api/enquiries',
      body: {
        name: 'Spam Bot',
        email: 'spambot@example.com',
        phone: '1234567890',
        service: 'Graphic Designing',
        description: 'Buy cheap watches now',
        website_url: 'http://spamwebsite.com' // Filled honeypot
      }
    });
    assert(resSpam.statusCode === 200, 'Honeypot trap catches bot and neutralizes payload');
    const spamInDb = await prisma.enquiry.findFirst({
      where: { email: 'spambot@example.com' }
    });
    assert(spamInDb === null, 'Spam bot submission is NOT stored in database');

    // 6. Public Services API test
    const resServices = await dispatch({
      method: 'GET',
      url: '/api/services'
    });
    assert(resServices.statusCode === 200 && Array.isArray(resServices.body.services), 'Public services catalog endpoint operational');

  } catch (err: any) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    if (createdEnquiryNum) {
      await prisma.enquiry.delete({ where: { enquiryNumber: createdEnquiryNum } }).catch(() => {});
    }
    await prisma.$disconnect();
  }

  console.log(`\n========================================================`);
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================================`);

  if (failed > 0) process.exit(1);
}

runTests();
