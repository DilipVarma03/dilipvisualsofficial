import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma';
import enquiryRoutes from './routes/enquiryRoutes';
import serviceRoutes from './routes/serviceRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL || ''
  ].filter(Boolean),
  credentials: true
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Agency API Health Check
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const enquiryCount = await prisma.enquiry.count();
    res.json({
      status: 'online',
      agency: 'DILIP VISUALS',
      location: 'Hyderabad, Telangana, India',
      philosophy: "Let's create something extraordinary.",
      contactEmail: 'dilipvisuals@gmail.com',
      contactWhatsApp: '+91 9398769483',
      database: 'connected',
      totalEnquiriesLogged: enquiryCount,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'database_error',
      error: err.message
    });
  }
});

// Mount Public Agency Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api', serviceRoutes);

// Error Handling Middleware
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error occurred on Dilip Visuals backend.'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  DILIP VISUALS — CREATIVE AGENCY BACKEND ONLINE    `);
    console.log(`  Endpoint: http://localhost:${PORT}                 `);
    console.log(`  Official Email: dilipvisuals@gmail.com             `);
    console.log(`  WhatsApp Support: +91 9398769483                   `);
    console.log(`  Location: Hyderabad, Telangana, India             `);
    console.log(`====================================================`);
  });
}

export { app };
export default app;
