import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma';
import { 
  sendEnquiryNotificationToAdmin, 
  sendEnquiryAcknowledgementToClient 
} from '../services/emailService';

const router = Router();

// In-memory rate limiting map for enquiries
// 5 submissions per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - clientData.lastReset > RATE_LIMIT_WINDOW) {
    clientData.count = 1;
    clientData.lastReset = now;
  } else {
    clientData.count++;
  }

  rateLimitMap.set(ip, clientData);

  if (clientData.count > MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({ 
      error: 'Too many enquiry requests from your connection. Please chat with us directly on WhatsApp (+91 9398769483) or email dilipvisuals@gmail.com.' 
    });
    return;
  }

  next();
};

/**
 * Public Contact / Enquiry Submission API
 * POST /api/enquiries
 */
router.post('/', rateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      country, 
      service, 
      budget, 
      budgetRange, 
      expectedDeadline, 
      deadline, 
      description, 
      preferredContact,
      website_url // Honeypot spam trap
    } = req.body;

    // Spam Protection: Honeypot check
    // If a hidden bot field is filled, silently simulate success to fool spam bots
    if (website_url) {
      console.warn('[Spam Trap Triggered] Honeypot field was filled. Dropping payload silently.');
      res.status(200).json({
        success: true,
        enquiryNumber: `DV-ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        message: 'Your enquiry has been received.'
      });
      return;
    }

    // Input Validation
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();
    const cleanService = (service || '').trim();
    const cleanDesc = (description || '').trim();
    const cleanBudget = (budgetRange || budget || '').trim();
    const cleanDeadline = (expectedDeadline || deadline || '').trim();

    if (!cleanName) {
      res.status(400).json({ error: 'Full name is required.' });
      return;
    }
    if (!cleanEmail) {
      res.status(400).json({ error: 'Email address is required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!cleanPhone) {
      res.status(400).json({ error: 'Phone / WhatsApp number is required.' });
      return;
    }
    if (!cleanService) {
      res.status(400).json({ error: 'Service selection is required.' });
      return;
    }
    if (!cleanDesc) {
      res.status(400).json({ error: 'Project description is required.' });
      return;
    }

    // Generate readable Enquiry Number e.g. DV-ENQ-2026-8492
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryNumber = `DV-ENQ-2026-${randomSuffix}`;

    // Store in Database
    const enquiry = await prisma.enquiry.create({
      data: {
        enquiryNumber,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: (company || '').trim() || null,
        country: (country || 'India').trim(),
        service: cleanService,
        budgetRange: cleanBudget || 'Flexible / Custom',
        expectedDeadline: cleanDeadline || 'Flexible',
        description: cleanDesc,
        preferredContact: preferredContact || 'whatsapp',
        status: 'new'
      }
    });

    console.log(`[Enquiry Logged] Stored enquiry ${enquiryNumber} from ${cleanName} (${cleanEmail}) in database.`);

    // 1. Send Admin Notification to dilipvisuals@gmail.com via Resend
    try {
      await sendEnquiryNotificationToAdmin({
        enquiryNumber: enquiry.enquiryNumber,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        company: enquiry.company,
        country: enquiry.country,
        service: enquiry.service,
        budgetRange: enquiry.budgetRange,
        expectedDeadline: enquiry.expectedDeadline,
        description: enquiry.description,
        preferredContact: enquiry.preferredContact
      });
    } catch (emailErr: any) {
      console.error('[Enquiry Email Warning] Admin notification dispatch error:', emailErr?.message);
    }

    // 2. Send Client Confirmation Email via Resend
    try {
      await sendEnquiryAcknowledgementToClient({
        enquiryNumber: enquiry.enquiryNumber,
        name: enquiry.name,
        email: enquiry.email,
        service: enquiry.service,
        preferredContact: enquiry.preferredContact
      });
    } catch (emailErr: any) {
      console.error('[Enquiry Email Warning] Client confirmation dispatch error:', emailErr?.message);
    }

    res.status(201).json({
      success: true,
      enquiryNumber,
      message: 'Thank you! Your creative enquiry has been received. Our team will contact you shortly.'
    });
  } catch (error: any) {
    console.error('[Enquiry Processing Error]', error);
    res.status(500).json({ error: error.message || 'Server error submitting enquiry. Please message us on WhatsApp.' });
  }
});

export default router;
