# DILIP VISUALS — COMPLETE FULL-STACK CREATIVE AGENCY PLATFORM

> **"Let's create something extraordinary."**  
> Premium Full-Stack Creative Digital Agency Platform operating from Hyderabad, Telangana, India.

---

## 🌟 Executive Summary

**DILIP VISUALS** is an international creative digital agency platform designed for content creators, YouTubers, startups, influencers, and established enterprises. Built with a bespoke Linear/Apple-inspired dark visual identity, electric violet accents, glassmorphic UI layers, and a robust Prisma-backed relational architecture.

This platform provides:
1. **Public Agency Website:** Hero storytelling, genuine new-agency identity, animated 5-step creative workflow, 6 service catalogs with instant quote modals, dynamic pricing, and WhatsApp integration.
2. **Executive Owner / Admin Dashboard (`/admin`):** Calculated analytics, client relationship management, quotation generator (GST 18%), invoice issuer, payment verifier, deliverables dispatcher, and site CMS.
3. **Client Creative Portal (`/dashboard`):** Interactive timeline tracking, quotation review & acceptance, invoice downloads, deliverable streaming, revision submissions, and direct studio WhatsApp hotline.
4. **Team Member Workspace (`/team/dashboard`):** Specialized pod interface for motion designers and editors to update progress, log timeline milestones, and upload project deliverables.
5. **Backend & Relational Database:** Full Express.js REST API with Prisma ORM (SQLite / PostgreSQL), JWT security, role-based access control, and PDF generation.

---

## 🚀 Key Features

### 1. Brand Identity & Public Website
- **Headline:** *"WE TURN IDEAS INTO EXTRAORDINARY VISUAL EXPERIENCES."*
- **Subheading:** *"Creative thinking. Powerful visuals. Digital experiences that make your brand unforgettable."*
- **Vision:** *"WE DON'T JUST CREATE DESIGNS. WE CREATE IDENTITIES."*
- **Honest Positioning:** Transparent new-agency framing without fake testimonials or fabricated metrics: *"OUR CREATIVE JOURNEY STARTS HERE."*
- **Creative Process:** 01 Discovery → 02 Strategy → 03 Creation → 04 Review → 05 Delivery.
- **WhatsApp Integration:** Floating widget and contextual buttons pre-filled for `+91 9398769483` (`https://wa.me/919398769483`).

### 2. Six Core Agency Services
1. **Video Editing:** YouTube long-form, Instagram Reels, corporate films, documentaries, motion graphics.
2. **Graphic Designing:** Social media creatives, posters, advertisements, brand assets.
3. **Thumbnail Designing:** High-CTR click-optimized thumbnails with psychological contrast.
4. **Branding & Visual Identity:** Logo marks, brand guidelines, typography palettes, stationery.
5. **Social Media Management:** Content calendars, organic strategy, high-cadence production.
6. **3D & Creative Visuals:** Blender/CGI product modeling, photorealistic rendering, 60fps animations.

### 3. Client Creative Portal (`/dashboard`)
- **Interactive Tracking:** Enquiry Received → Quotation Approved → Project Started → In Progress → Client Review → Completed → Delivered.
- **Quotations:** Itemized deliverables, 18% GST calculation, branded PDF downloads, one-click formal acceptance with timestamp.
- **Invoices & Payments:** Tax invoice generation, payment history, direct UPI payment to `9398769483@ybl` with copy action.
- **Files & Deliverables:** Master download repository with download counters, reference file link submissions.
- **Revision Requests:** Timecoded revision submissions with priority levels and studio responses.
- **Messages & Support:** Direct WhatsApp connection pre-filled with client ID and project details.

### 4. Owner / Admin Dashboard (`/admin`)
- **Real Calculated Analytics:**
  - Total Clients
  - Total Projects
  - Active Projects
  - Pending Projects
  - Completed Projects
  - New Enquiries
  - Pending Quotations
  - Total Revenue (from verified payments)
  - Outstanding Balance
- **Recharts Revenue Chart:** Monthly visual trajectory and project distribution.
- **Quotations & Invoices System:** Generation of branded PDF documents via jsPDF with auto-calculated tax and terms.
- **Client & Team Management:** Manual enrollment, status toggles, and role assignments.
- **Website CMS:** Live editing of slogans, contact coordinates, announcements, and SEO metadata.

### 5. Team Member Workspace (`/team/dashboard`)
- Restricted pod workspace for editors and motion designers.
- Progress percentage slider (0-100%).
- Milestone updates posted directly to the client's live timeline.
- Deliverable uploads with status notifications.
- Financial revenue data and client private records remain strictly hidden.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Animation** | Tailwind CSS v4, Framer Motion, Lucide Icons |
| **Analytics & Data Viz** | Recharts (Responsive Area & Bar Charts) |
| **PDF Generation** | jsPDF & jsPDF-Autotable |
| **Backend Framework** | Node.js, Express.js, TypeScript |
| **Database & ORM** | Prisma ORM 6.4.1 (SQLite local / PostgreSQL production) |
| **Authentication & RBAC** | JWT, Cookie-Parser, Google OAuth 2.0 |
| **File Management** | Multer disk storage & Cloud storage abstraction |
| **Email Service** | Resend Transactional Email API |

---

## 📂 Project Structure

```
dilip-visuals/
├── prisma/
│   ├── schema.prisma          # 22 relational models with indexes and cascades
│   └── dev.db                 # Local SQLite database
├── public/
│   ├── favicon.svg            # Animated Dilip Visuals brand icon
│   ├── robots.txt             # Search crawler directives
│   └── sitemap.xml            # SEO sitemap with clean URLs
├── server/
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication & role-based access control
│   │   └── upload.ts          # Multer file upload & format validation
│   ├── routes/
│   │   ├── adminRoutes.ts     # Analytics, client management, team, settings CMS
│   │   ├── authRoutes.ts      # Google OAuth, demo role switcher, sessions
│   │   ├── enquiryRoutes.ts   # Rate-limited public enquiry submissions
│   │   ├── invoiceRoutes.ts   # Invoices & manual payment verifications
│   │   ├── notificationRoutes.ts # In-app notification center
│   │   ├── projectRoutes.ts   # Project workflows, milestones, files, revisions
│   │   ├── quotationRoutes.ts # Quotation generator & acceptance
│   │   └── serviceRoutes.ts   # Services catalog & dynamic pricing
│   ├── services/
│   │   └── emailService.ts    # Resend email notification service
│   ├── prisma.ts              # Shared Prisma client instance
│   ├── seed.ts                # Production database seed script
│   ├── server.ts              # Express application entrypoint
│   ├── testSuite.ts           # 22 backend unit test cases
│   └── testIntegration.ts     # 11 integration test cases
├── src/
│   ├── components/
│   │   ├── common/            # Logo, QuoteModal, FloatingWhatsApp
│   │   └── layout/            # Navbar, Footer, AnnouncementBar
│   ├── context/
│   │   ├── AuthContext.tsx    # Multi-role auth provider & demo switcher
│   │   └── ToastContext.tsx   # Interactive toast notifications
│   ├── lib/
│   │   ├── api.ts             # Frontend REST API client layer
│   │   ├── firestoreService.ts # Dual-engine database adapter
│   │   ├── mockData.ts        # Fallback offline datasets
│   │   ├── pdfGenerator.ts    # Branded jsPDF Quotation & Invoice generator
│   │   └── utils.ts           # Currency (INR/USD), dates, badge formatters
│   ├── pages/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx # Complete 13-tab owner dashboard
│   │   ├── client/
│   │   │   ├── ClientLayout.tsx
│   │   │   ├── ClientOverview.tsx
│   │   │   ├── ClientProjects.tsx
│   │   │   ├── ClientProjectDetail.tsx
│   │   │   ├── ClientQuotations.tsx
│   │   │   ├── ClientInvoices.tsx
│   │   │   ├── ClientFiles.tsx
│   │   │   ├── ClientRevisions.tsx
│   │   │   ├── ClientSupport.tsx
│   │   │   └── ClientProfile.tsx
│   │   ├── team/
│   │   │   └── TeamDashboard.tsx # Specialized team editor workspace
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Pricing.tsx
│   │   ├── Services.tsx
│   │   └── Vision.tsx
│   ├── App.tsx                # Route registry & security guards
│   └── main.tsx
├── .env                       # Environment variables
├── .env.example               # Configuration template
├── DEPLOYMENT.md              # Production deployment handbook
└── package.json
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database & Seed
```bash
npm run db:push
npm run seed
```

### 3. Run Test Suites
```bash
npm run test:backend
npm run test:integration
```

### 4. Start Development Servers
In terminal 1 (Backend API):
```bash
npm run server
```

In terminal 2 (Frontend Client):
```bash
npm run dev
```

Visit `http://localhost:5173` to explore the agency platform.

---

## 👥 Default Demo Credentials for Immediate Testing

Use the **Quick Switcher** in the top navigation or sidebar of any portal to toggle between roles:

- **Owner / Super Admin:** `dilip@dilipvisuals.com` → Access `/admin`
- **Lead Team Editor:** `editor@dilipvisuals.com` → Access `/team/dashboard`
- **Client Partner:** `vikram.techhub@gmail.com` → Access `/dashboard`

---

## 📞 Studio Contact Coordinates

- **Agency:** DILIP VISUALS
- **Location:** Hyderabad, Telangana, India
- **WhatsApp:** [+91 9398769483](https://wa.me/919398769483)
- **Email:** `contact@dilipvisuals.com`
- **UPI Settlement:** `9398769483@ybl`
