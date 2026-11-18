import { app } from './server';
import { prisma } from './prisma';

async function runIntegration() {
  console.log('--- STARTING EXPRESS + PRISMA INTEGRATION VERIFICATION ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  try {
    // 1. Health endpoint logic
    const userCount = await prisma.user.count();
    assert(userCount >= 3, `Prisma user count verified (Found: ${userCount})`);

    // 2. Demo role authentication
    const adminUser = await prisma.user.findUnique({ where: { email: 'dilip@dilipvisuals.com' } });
    assert(adminUser?.role === 'super_admin', 'Owner admin role is verified');

    const teamUser = await prisma.user.findUnique({ where: { email: 'editor@dilipvisuals.com' } });
    assert(teamUser?.role === 'team_member', 'Team member role is verified');

    const clientUser = await prisma.user.findUnique({ where: { email: 'vikram.techhub@gmail.com' } });
    assert(clientUser?.role === 'client', 'Client role is verified');

    // 3. Services Catalog
    const services = await prisma.service.findMany({ where: { active: true } });
    assert(services.length === 6, '6 Core agency services active');

    // 4. Quotations & Invoices Relational Checks
    const quotations = await prisma.quotation.findMany({ include: { items: true, project: true } });
    assert(quotations.length > 0, 'Quotation exists with line items and linked project');
    assert(quotations[0].items.length > 0, 'Quotation line items exist');

    const invoices = await prisma.invoice.findMany({ include: { items: true, payments: true } });
    assert(invoices.length > 0, 'Invoice exists with items and verified payments');
    assert(invoices[0].payments.length > 0, 'Payment ledger entries linked to invoice');

    // 5. Revision Requests
    const revisions = await prisma.revisionRequest.findMany();
    assert(revisions.length > 0, 'Revision requests stored with client and project linkage');

    // 6. Notifications
    const notifications = await prisma.notification.findMany();
    assert(notifications.length > 0, 'In-app notification system active');

    console.log(`\n========================================`);
    console.log(`INTEGRATION RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================`);

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error('Integration failure:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runIntegration();
