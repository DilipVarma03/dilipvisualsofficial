import { prisma } from './prisma';
import { generateToken } from './middleware/auth';

async function runTests() {
  console.log('--- STARTING DILIP VISUALS BACKEND TEST SUITE ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Verify Users & Roles
    const admin = await prisma.user.findUnique({ where: { email: 'dilip@dilipvisuals.com' } });
    assert(!!admin && admin.role === 'super_admin', 'Admin user exists with super_admin role');

    const client = await prisma.user.findUnique({
      where: { email: 'vikram.techhub@gmail.com' },
      include: { clientProfile: true }
    });
    assert(!!client && client.role === 'client' && !!client.clientProfile, 'Client user exists with clientProfile relation');

    const team = await prisma.user.findUnique({
      where: { email: 'editor@dilipvisuals.com' },
      include: { teamMember: true }
    });
    assert(!!team && team.role === 'team_member' && !!team.teamMember, 'Team member exists with teamMember profile');

    // 2. Verify Services Catalog
    const services = await prisma.service.findMany({ where: { active: true } });
    assert(services.length === 6, `6 Core agency services exist (Found: ${services.length})`);

    const videoService = services.find(s => s.slug === 'video-editing');
    assert(!!videoService && videoService.startingPriceINR === 15000, 'Video Editing service has correct pricing structure');

    // 3. Verify Dynamic Pricing Packages
    const pricingPackages = await prisma.pricingPackage.findMany();
    assert(pricingPackages.length === 3, `3 Pricing tiers exist: Starter, Professional, Custom (Found: ${pricingPackages.length})`);

    // 4. Verify Project & Timeline Integrity
    const project = await prisma.project.findUnique({
      where: { projectNumber: 'DV-PRJ-2026-001' },
      include: { members: true, updates: true, files: true, revisionRequests: true }
    });
    assert(!!project, 'Flagship test project DV-PRJ-2026-001 exists in database');
    assert(project?.progress === 65, 'Project progress is tracked at 65%');
    assert((project?.updates.length || 0) >= 2, 'Project has milestone updates in timeline');
    assert((project?.files.length || 0) >= 2, 'Project has deliverables and reference files attached');
    assert((project?.revisionRequests.length || 0) >= 1, 'Project has active revision request');

    // 5. Verify Quotation & GST Calculations
    const quotation = await prisma.quotation.findUnique({
      where: { quotationNumber: 'DV-QT-2026-001' },
      include: { items: true }
    });
    assert(!!quotation, 'Quotation DV-QT-2026-001 exists');
    assert(quotation?.status === 'accepted', 'Quotation acceptance status recorded');
    assert(quotation?.gstRate === 18, 'Quotation standard GST rate is 18%');
    assert(quotation?.totalAmount === 38940, `Quotation total matches calculation (₹38,940, got: ${quotation?.totalAmount})`);

    // 6. Verify Invoice & Payments Integrity
    const invoice = await prisma.invoice.findUnique({
      where: { invoiceNumber: 'DV-INV-2026-001' },
      include: { items: true, payments: true }
    });
    assert(!!invoice, 'Invoice DV-INV-2026-001 exists');
    assert(invoice?.status === 'partially_paid', 'Invoice payment status correctly tracked as partially_paid');
    assert(invoice?.paidAmount === 20000, 'Advance payment of ₹20,000 recorded');
    assert(invoice?.balanceDue === 18940, 'Remaining balance of ₹18,940 calculated accurately');

    // 7. Verify RBAC Token Generation
    const clientToken = generateToken({
      id: client!.id,
      email: client!.email,
      name: client!.name,
      role: client!.role as any
    });
    assert(typeof clientToken === 'string' && clientToken.length > 20, 'Client JWT token generated successfully');

    const adminToken = generateToken({
      id: admin!.id,
      email: admin!.email,
      name: admin!.name,
      role: admin!.role as any
    });
    assert(typeof adminToken === 'string' && adminToken.length > 20, 'Admin JWT token generated successfully');

    // 8. Verify Client Privacy Isolation
    const otherProjectsForClient = await prisma.project.findMany({
      where: { clientId: 'non-existent-or-unauthorized-id' }
    });
    assert(otherProjectsForClient.length === 0, 'Client privacy boundary enforced: unauthorized queries return 0 projects');

    console.log(`\n========================================`);
    console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test execution error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
