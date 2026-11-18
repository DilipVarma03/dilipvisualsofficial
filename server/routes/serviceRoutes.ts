import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

// 1. Get All Active Services (Public)
router.get('/services', async (_req: Request, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' }
    });
    res.json({ services });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching services' });
  }
});

// 2. Get All Active Pricing Packages (Public)
router.get('/pricing', async (_req: Request, res: Response): Promise<void> => {
  try {
    const packages = await prisma.pricingPackage.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' }
    });
    res.json({ packages });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching pricing packages' });
  }
});

// 3. Get Agency CMS Content (Public)
router.get('/content', async (_req: Request, res: Response): Promise<void> => {
  try {
    const content = await prisma.websiteContent.findFirst({
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ content });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error fetching content' });
  }
});

export default router;
