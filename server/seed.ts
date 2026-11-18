import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Seeding Dilip Visuals database...');

  // 1. Create or update Default Owner / Super Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'dilip@dilipvisuals.com' },
    update: {},
    create: {
      id: 'dilip-owner-001',
      email: 'dilip@dilipvisuals.com',
      name: 'Dilip (Founder & Creative Director)',
      phone: '+91 9398769483',
      country: 'India',
      role: 'super_admin',
      accountStatus: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    }
  });

  // 2. Create or update Team Member
  const teamUser = await prisma.user.upsert({
    where: { email: 'editor@dilipvisuals.com' },
    update: {},
    create: {
      id: 'team-member-001',
      email: 'editor@dilipvisuals.com',
      name: 'Arjun Verma (Lead Motion Designer)',
      phone: '+91 9876543210',
      country: 'India',
      role: 'team_member',
      accountStatus: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      teamMember: {
        create: {
          jobTitle: 'Senior Motion Graphic Artist',
          department: 'Video Production',
          bio: 'Specializing in DaVinci Resolve color grading, Premiere Pro pacing, and After Effects motion graphics.',
          skills: JSON.stringify(['Premiere Pro', 'After Effects', 'Blender', 'Color Grading', 'Sound Design']),
          activeProjectsCount: 1
        }
      }
    }
  });

  // 3. Create or update Initial Client
  const clientUser = await prisma.user.upsert({
    where: { email: 'vikram.techhub@gmail.com' },
    update: {},
    create: {
      id: 'client-user-001',
      email: 'vikram.techhub@gmail.com',
      name: 'Vikram Reddy',
      phone: '+91 9849012345',
      country: 'India',
      role: 'client',
      accountStatus: 'active',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      clientProfile: {
        create: {
          businessName: 'TechHub Insights',
          website: 'https://techhubinsights.in',
          industry: 'Technology Media & YouTube',
          city: 'Hyderabad',
          state: 'Telangana',
          country: 'India',
          taxId: '36ABCDE1234F1Z5',
          billingAddress: 'Plot 42, HITEC City, Madhapur, Hyderabad, Telangana 500081'
        }
      }
    }
  });

  // 4. Seed Website Settings CMS
  await prisma.websiteSettings.upsert({
    where: { id: 'dv-global-settings' },
    update: {},
    create: {
      id: 'dv-global-settings',
      agencyName: 'DILIP VISUALS',
      tagLine: "Let's create something extraordinary.",
      heroTitle: 'WE TURN IDEAS INTO EXTRAORDINARY VISUAL EXPERIENCES.',
      heroSubtitle: 'Creative thinking. Powerful visuals. Digital experiences that make your brand unforgettable.',
      contactEmail: 'contact@dilipvisuals.com',
      contactPhone: '+91 9398769483',
      whatsappNumber: '919398769483',
      locationAddress: 'Hyderabad, Telangana, India',
      gstNumber: '36AAAAA0000A1Z5',
      instagramUrl: 'https://instagram.com/dilipvisuals',
      youtubeUrl: 'https://youtube.com/@dilipvisuals',
      linkedinUrl: 'https://linkedin.com/company/dilipvisuals',
      twitterUrl: 'https://x.com/dilipvisuals',
      metaTitle: 'DILIP VISUALS | Creative Digital Agency Hyderabad',
      metaDescription: 'Dilip Visuals is a premium creative agency based in Hyderabad, India specializing in high-end video editing, graphic design, branding, and digital visual experiences.',
      announcementText: 'CREATIVE THINKING • POWERFUL VISUALS • EXTRAORDINARY RESULTS'
    }
  });

  // 5. Seed Core Agency Services
  const servicesData = [
    {
      slug: 'video-editing',
      title: 'Video Editing',
      subtitle: 'Cinematic, fast-paced, and engaging storytelling for modern creators.',
      description: 'Professional high-end post-production across YouTube long-form, viral Instagram Reels, corporate brand stories, promotional teasers, and documentary filmmaking.',
      category: 'Video Production',
      startingPriceINR: 15000,
      startingPriceUSD: 250,
      deliverables: JSON.stringify([
        'Full 4K Ultra HD Master export',
        'Advanced Sound Design & Foley',
        'Custom Sound Effects & Licensed Background Music',
        'Cinema-Grade Color Grading (LUTs & Log correction)',
        'Motion Graphics & Custom Lower Thirds',
        'Subtitle SRT / Burned-in captions'
      ]),
      suitableFor: JSON.stringify(['YouTubers', 'Tech Influencers', 'Founders', 'Brands', 'Podcasters']),
      icon: 'Video',
      displayOrder: 1,
      isFeatured: true
    },
    {
      slug: 'graphic-designing',
      title: 'Graphic Designing',
      subtitle: 'Visually arresting creatives engineered for high engagement and conversions.',
      description: 'Data-driven graphic design that cuts through the social media feed. From launch campaign creatives to social carousels and marketing collaterals.',
      category: 'Design & Art',
      startingPriceINR: 8000,
      startingPriceUSD: 150,
      deliverables: JSON.stringify([
        'High-resolution multi-format exports (PNG, WebP, PDF)',
        'Layered source files (PSD / AI / Figma)',
        'Platform-optimized aspect ratios (1:1, 4:5, 9:16, 16:9)',
        'Brand guideline compliance check',
        'Interactive Figma inspection link'
      ]),
      suitableFor: JSON.stringify(['Startups', 'E-commerce Brands', 'D2C Companies', 'Marketing Agencies']),
      icon: 'Palette',
      displayOrder: 2,
      isFeatured: true
    },
    {
      slug: 'thumbnail-designing',
      title: 'Thumbnail Designing',
      subtitle: 'Click-worthy, high-CTR thumbnails engineered for algorithmic dominance.',
      description: 'We analyze YouTube viewer psychology, focal contrast, typography hierarchy, and emotional expressions to maximize your Impressions Click-Through Rate (CTR).',
      category: 'Design & Art',
      startingPriceINR: 3500,
      startingPriceUSD: 60,
      deliverables: JSON.stringify([
        'Ultra-sharp 1920x1080 Thumbnail Master',
        'Mobile readability & contrast testing preview',
        '2 Unique Concept Variations for A/B Testing',
        'Face cutouts & frequency separation enhancements'
      ]),
      suitableFor: JSON.stringify(['YouTubers', 'Gamers', 'Course Creators', 'Podcasters']),
      icon: 'Sparkles',
      displayOrder: 3,
      isFeatured: true
    },
    {
      slug: 'branding-visual-identity',
      title: 'Branding and Visual Identity',
      subtitle: 'Distinguish your brand with a timeless identity that commands authority.',
      description: 'End-to-end brand architecture: iconic logo marks, comprehensive typography systems, bespoke color palettes, and strict brand guidelines that build memorable brand equity.',
      category: 'Brand Strategy',
      startingPriceINR: 35000,
      startingPriceUSD: 500,
      deliverables: JSON.stringify([
        'Primary, Secondary, and Monogram Logo Suite',
        'Comprehensive Brand Guidelines Book (PDF)',
        'Typography Pairing Hierarchy & Font Licensure guidance',
        'CMYK / RGB / HEX Color System',
        'Business Card, Letterhead & Social Media Kit'
      ]),
      suitableFor: JSON.stringify(['New Startups', 'Rebranding Enterprises', 'Creators Launching Products']),
      icon: 'Layers',
      displayOrder: 4,
      isFeatured: true
    },
    {
      slug: 'social-media-management',
      title: 'Social Media Management',
      subtitle: 'Organic growth strategies fueled by high-cadence creative production.',
      description: 'Comprehensive content calendars, creative asset generation, trend capitalization, and brand storytelling that turn casual scrollers into loyal advocates.',
      category: 'Growth & Strategy',
      startingPriceINR: 25000,
      startingPriceUSD: 400,
      deliverables: JSON.stringify([
        'Monthly Content Strategy & Ideation Calendar',
        '16+ Custom Visual Creatives & Reels per month',
        'Copywriting & Hashtag Optimization',
        'Monthly Analytics & Audience Sentiment Report'
      ]),
      suitableFor: JSON.stringify(['Agencies', 'Influencers', 'D2C Brands', 'Founders Building in Public']),
      icon: 'Share2',
      displayOrder: 5,
      isFeatured: true
    },
    {
      slug: '3d-creative-visuals',
      title: '3D and Creative Visuals',
      subtitle: 'Photorealistic product animations and immersive 3D simulations.',
      description: 'Bespoke 3D modeling, lighting, physics simulation, and cinematic motion built in Blender and Unreal Engine to showcase your products from angles impossible in real life.',
      category: '3D & CGI',
      startingPriceINR: 40000,
      startingPriceUSD: 650,
      deliverables: JSON.stringify([
        'Full 3D Product Modeling & Texturing',
        'Photorealistic Ray-Traced Renders (8K Still Renders)',
        '60fps Smooth 3D Commercial Animation Video',
        'Transparent Alpha Channel Renders for Web Integration'
      ]),
      suitableFor: JSON.stringify(['Hardware Startups', 'Consumer Tech', 'App Developers', 'Luxury Goods']),
      icon: 'Box',
      displayOrder: 6,
      isFeatured: true
    }
  ];

  for (const svc of servicesData) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc
    });
  }

  // 6. Seed Dynamic Pricing Packages
  const packagesData = [
    {
      name: 'Starter',
      category: 'General',
      startingPriceINR: 15000,
      startingPriceUSD: 250,
      billingCycle: 'Per Project',
      popular: false,
      description: 'Ideal for independent creators, YouTubers, and early-stage entrepreneurs launching their first flagship visual identity or content series.',
      ctaText: 'Get Started with Starter',
      displayOrder: 1,
      features: JSON.stringify([
        'Dedicated Creative Lead',
        'Up to 3 Long-form Videos or 8 Reels per batch',
        'Custom Sound Design & Color Grading',
        '2 Iterative Revision Rounds',
        'Direct WhatsApp Channel Support',
        'Standard 3-5 Business Days Delivery'
      ])
    },
    {
      name: 'Professional',
      category: 'General',
      startingPriceINR: 35000,
      startingPriceUSD: 500,
      billingCycle: 'Per Project / Monthly',
      popular: true,
      description: 'Engineered for high-cadence content creators, funded startups, and scaling businesses demanding premium visual consistency.',
      ctaText: 'Choose Professional',
      displayOrder: 2,
      features: JSON.stringify([
        'Senior Motion Graphic Artists & Editors',
        'Up to 8 Long-form Videos or 20 Reels per month',
        'Custom Thumbnails (A/B Test variations included)',
        'Cinema-Grade 4K Color Grading & Advanced VFX',
        'Unlimited Revision Rounds within scope',
        'Dedicated Project Manager & Priority Queue',
        'Fast 48-72 Hours Turnaround'
      ])
    },
    {
      name: 'Custom Solutions',
      category: 'Enterprise',
      startingPriceINR: 75000,
      startingPriceUSD: 1000,
      billingCycle: 'Milestone-Based',
      popular: false,
      description: 'Tailored for established enterprises, global agencies, and large media channels requiring end-to-end creative production pipelines.',
      ctaText: 'Request Custom Proposal',
      displayOrder: 3,
      features: JSON.stringify([
        'Full Creative Production Suite (3D, CGI, Video, Brand)',
        'Custom Soundtracks & Broadcast Licensure',
        'Dedicated Creative Director + Production Pod',
        'Custom SLA & 24/7 Dedicated Support',
        'Complete Source Files & IP Transfer',
        'White-label Agency Delivery Available'
      ])
    }
  ];

  for (const pkg of packagesData) {
    const existing = await prisma.pricingPackage.findFirst({ where: { name: pkg.name } });
    if (existing) {
      await prisma.pricingPackage.update({ where: { id: existing.id }, data: pkg });
    } else {
      await prisma.pricingPackage.create({ data: pkg });
    }
  }

  // 7. Seed Initial Project for Vikram Reddy (Client)
  const project = await prisma.project.upsert({
    where: { projectNumber: 'DV-PRJ-2026-001' },
    update: {},
    create: {
      id: 'prj-techhub-001',
      projectNumber: 'DV-PRJ-2026-001',
      clientId: clientUser.id,
      title: 'Flagship Tech Documentary: The Rise of AI Hardware',
      serviceType: 'Video Editing',
      description: 'Complete post-production, multi-cam sync, motion graphics explainer segments, sound design, and color grading for a 22-minute documentary.',
      status: 'In Progress',
      progress: 65,
      budget: 35000,
      currency: 'INR',
      startDate: new Date('2026-11-10'),
      deliveryDate: new Date('2026-11-25'),
      assignedTeam: 'Dilip (Creative Director) & Arjun (Lead Editor)',
      internalNotes: 'Client provided 120GB RAW footage in 4K ProRes. Music track selected from Epidemic Sound.'
    }
  });

  // Assign Team Member to Project
  await prisma.projectMember.upsert({
    where: {
      projectId_userId: {
        projectId: project.id,
        userId: teamUser.id
      }
    },
    update: {},
    create: {
      projectId: project.id,
      userId: teamUser.id,
      roleInProject: 'Lead Motion Designer'
    }
  });

  // Add Project Milestone Updates
  const existingUpdates = await prisma.projectUpdate.count({ where: { projectId: project.id } });
  if (existingUpdates === 0) {
    await prisma.projectUpdate.createMany({
      data: [
        {
          projectId: project.id,
          authorId: adminUser.id,
          authorName: 'Dilip (Creative Director)',
          title: 'Footage Ingested & Rough Assembly Cut Completed',
          content: 'All 4K camera angles ingested and synchronized with multi-track audio. The initial 22-minute rough narrative cut is structured.',
          progressAtUpdate: 35,
          isClientVisible: true
        },
        {
          projectId: project.id,
          authorId: teamUser.id,
          authorName: 'Arjun Verma',
          title: 'Custom Motion Graphics & 3D Explainer Cards Added',
          content: 'Inserted 5 custom 3D hardware schematic diagrams and kinetic typography lower thirds.',
          progressAtUpdate: 65,
          isClientVisible: true
        }
      ]
    });
  }

  // Add Deliverables
  const existingFiles = await prisma.projectFile.count({ where: { projectId: project.id } });
  if (existingFiles === 0) {
    await prisma.projectFile.createMany({
      data: [
        {
          projectId: project.id,
          uploaderId: adminUser.id,
          fileName: 'Tech_Doc_Rough_Cut_v1.mp4',
          originalName: 'Tech_Doc_Rough_Cut_v1.mp4',
          fileType: 'video',
          mimeType: 'video/mp4',
          fileSize: '450 MB',
          fileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          storageProvider: 'LOCAL',
          category: 'WORK_IN_PROGRESS',
          accessLevel: 'CLIENT_VISIBLE',
          downloadCount: 3
        },
        {
          projectId: project.id,
          uploaderId: clientUser.id,
          fileName: 'Brand_Assets_and_Script.zip',
          originalName: 'Brand_Assets_and_Script.zip',
          fileType: 'archive',
          mimeType: 'application/zip',
          fileSize: '12 MB',
          fileUrl: '/uploads/Brand_Assets_and_Script.zip',
          storageProvider: 'LOCAL',
          category: 'REFERENCE',
          accessLevel: 'CLIENT_VISIBLE',
          downloadCount: 1
        }
      ]
    });
  }

  // Add Quotation
  const quotation = await prisma.quotation.upsert({
    where: { quotationNumber: 'DV-QT-2026-001' },
    update: {},
    create: {
      id: 'qt-2026-001',
      quotationNumber: 'DV-QT-2026-001',
      projectId: project.id,
      clientId: clientUser.id,
      clientName: clientUser.name,
      clientEmail: clientUser.email,
      title: 'Post-Production Agreement: AI Hardware Documentary',
      validUntil: new Date('2026-12-10'),
      subtotal: 35000,
      discount: 2000,
      gstRate: 18,
      gstAmount: 5940,
      totalAmount: 38940,
      currency: 'INR',
      status: 'accepted',
      acceptedAt: new Date('2026-11-11'),
      terms: 'Standard Dilip Visuals creative production terms. Delivery within 14 business days. 2 comprehensive revision rounds included.',
      notes: 'Special launch discount applied for inaugural agency partnership.',
      items: {
        create: [
          {
            description: '4K Multi-Camera Long-Form Video Editing (22 min documentary)',
            quantity: 1,
            unitPrice: 25000,
            amount: 25000
          },
          {
            description: 'Sound Design, Cinema Color Grading & Audio Restoration',
            quantity: 1,
            unitPrice: 6000,
            amount: 6000
          },
          {
            description: 'High-CTR YouTube Thumbnails (2 Concept Variations for A/B testing)',
            quantity: 2,
            unitPrice: 2000,
            amount: 4000
          }
        ]
      }
    }
  });

  // Add Invoice
  await prisma.invoice.upsert({
    where: { invoiceNumber: 'DV-INV-2026-001' },
    update: {},
    create: {
      id: 'inv-2026-001',
      invoiceNumber: 'DV-INV-2026-001',
      projectId: project.id,
      quotationId: quotation.id,
      clientId: clientUser.id,
      clientName: clientUser.name,
      clientEmail: clientUser.email,
      issueDate: new Date('2026-11-11'),
      dueDate: new Date('2026-11-25'),
      subtotal: 33000,
      discount: 0,
      gstRate: 18,
      gstAmount: 5940,
      totalAmount: 38940,
      paidAmount: 20000,
      balanceDue: 18940,
      currency: 'INR',
      paymentTerms: '50% advance upon project initiation, balance 50% upon final deliverable handoff.',
      status: 'partially_paid',
      notes: 'Advance of ₹20,000 received via UPI on Nov 11, 2026. Balance due upon delivery.',
      items: {
        create: [
          {
            description: 'Documentary Video Editing Master (22 min)',
            quantity: 1,
            unitPrice: 25000,
            amount: 25000
          },
          {
            description: 'Audio Mixing, Color Grading & Master Subtitle Track',
            quantity: 1,
            unitPrice: 6000,
            amount: 6000
          },
          {
            description: 'YouTube Click-Optimized Thumbnails (2 Variations)',
            quantity: 2,
            unitPrice: 1000,
            amount: 2000
          }
        ]
      },
      payments: {
        create: [
          {
            paymentNumber: 'DV-PAY-2026-001',
            clientId: clientUser.id,
            amount: 20000,
            currency: 'INR',
            paymentMethod: 'UPI',
            transactionRef: 'UPI/20261111/9398769483@ybl/73912',
            status: 'verified',
            verifiedBy: 'Dilip (Super Admin)',
            verifiedAt: new Date('2026-11-11'),
            notes: 'Advance payment confirmed.'
          }
        ]
      }
    }
  });

  // Add Initial Revision Request
  const existingRevisions = await prisma.revisionRequest.count({ where: { projectId: project.id } });
  if (existingRevisions === 0) {
    await prisma.revisionRequest.create({
      data: {
        projectId: project.id,
        clientId: clientUser.id,
        title: 'Adjust background music volume during intro voiceover',
        description: 'At 01:15 to 02:40, the synth bass frequency is slightly overpowering the narrative speaker. Please lower background music by -3dB and boost dialogue clarity.',
        timecodes: '01:15 - 02:40',
        priority: 'normal',
        status: 'in_progress',
        adminResponse: 'Understood Vikram! Arjun is ducking the audio stems by -4dB and applying dynamic EQ.'
      }
    });
  }

  // Add Notifications
  const existingNotifs = await prisma.notification.count();
  if (existingNotifs === 0) {
    await prisma.notification.createMany({
      data: [
        {
          userId: clientUser.id,
          title: 'Project In Progress',
          message: 'Work on "Flagship Tech Documentary" has progressed to 65%. 3D explainers added.',
          type: 'PROJECT',
          link: '/dashboard/projects/prj-techhub-001'
        },
        {
          userId: adminUser.id,
          title: 'New Revision Submitted',
          message: 'Client Vikram Reddy submitted an audio adjustment revision on DV-PRJ-2026-001.',
          type: 'PROJECT',
          link: '/admin?tab=projects'
        }
      ]
    });
  }

  console.log('[Seed] Database successfully seeded with Dilip Visuals production data!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
