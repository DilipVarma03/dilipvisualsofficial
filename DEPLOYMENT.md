# DILIP VISUALS — COMPLETE FULL-STACK PRODUCTION DEPLOYMENT GUIDE

**DILIP VISUALS – "Let's create something extraordinary."**  
**Location:** Hyderabad, Telangana, India  
**WhatsApp:** +91 9398769483  

---

## 1. Architecture Overview

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts, jsPDF
- **Backend:** Node.js, Express.js, TypeScript, REST API, Multer, JWT, Cookie-Parser
- **Database ORM:** Prisma ORM 6.4.1 (with SQLite for local zero-config, PostgreSQL for production)
- **Database Engine:** Supabase PostgreSQL or Neon PostgreSQL
- **Authentication:** Google OAuth 2.0 + Role-Based Access Control (Super Admin, Admin, Team Member, Client)
- **PDF Engine:** Client & Server-side PDF generation for formal Quotations & Tax Invoices
- **Notification Engine:** Resend Transactional Email API + In-App Real-time Notification Center
- **Media & File Storage:** Private storage engine with Cloudinary / AWS S3 abstraction
- **Production Hosts:**
  - Frontend: **Vercel**
  - Backend: **Render** or **Railway**
  - Database: **Supabase** or **Neon**

---

## 2. Environment Variables Specification

Create or populate `.env` in the project root:

```env
# ==========================================
# SERVER & CLIENT ADDRESSES
# ==========================================
PORT=5000
FRONTEND_URL=https://dilipvisuals.com
BACKEND_URL=https://api.dilipvisuals.com

# ==========================================
# DATABASE CONFIGURATION
# ==========================================
# For local development:
DATABASE_URL="file:./dev.db"

# For Production (Supabase / Neon PostgreSQL):
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres?schema=public"

# ==========================================
# AUTHENTICATION & SECURITY
# ==========================================
SESSION_SECRET="generate-a-64-character-crypto-secure-secret-here"
ADMIN_BOOTSTRAP_SECRET="dilip-visuals-super-secret-key-2026"
OWNER_EMAILS="dilip@dilipvisuals.com,dilipvisuals@gmail.com"

# ==========================================
# GOOGLE OAUTH 2.0 (Google Cloud Console)
# ==========================================
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CALLBACK_URL="https://api.dilipvisuals.com/api/auth/google/callback"

# ==========================================
# TRANSACTIONAL EMAIL (Resend)
# ==========================================
RESEND_API_KEY="re_your_api_key_from_resend_com"
NOTIFICATION_SENDER_EMAIL="notifications@dilipvisuals.com"

# ==========================================
# CLOUD FILE STORAGE (Cloudinary / AWS S3)
# ==========================================
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# ==========================================
# FRONTEND PUBLIC METADATA
# ==========================================
VITE_AGENCY_NAME="DILIP VISUALS"
VITE_AGENCY_LOCATION="Hyderabad, Telangana, India"
VITE_AGENCY_PHONE="+91 9398769483"
VITE_AGENCY_WHATSAPP_NUMBER="919398769483"
VITE_BACKEND_URL="https://api.dilipvisuals.com"
```

---

## 3. Database Setup & Production Migrations

### Local Zero-Config Setup (SQLite)
The application is pre-configured with SQLite `file:./dev.db`.
To sync and seed immediately:
```bash
npm run db:push
npm run seed
```

### Production PostgreSQL Setup (Supabase / Neon)
1. Create a PostgreSQL project on [Supabase](https://supabase.com) or [Neon](https://neon.tech).
2. Copy the Connection String (URI).
3. In `prisma/schema.prisma`, update the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run migrations and database push:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

---

## 4. Google OAuth 2.0 Production Setup

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project named `Dilip Visuals`.
3. Navigate to **APIs & Services** → **OAuth consent screen**:
   - User Type: **External**
   - App Name: `DILIP VISUALS`
   - User Support Email: `contact@dilipvisuals.com` or your Gmail
   - Developer Contact Email: `dilip@dilipvisuals.com`
   - Authorized Domains: `dilipvisuals.com`, `vercel.app`
4. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**:
   - Application type: **Web Application**
   - Authorized JavaScript origins:
     - `http://localhost:5173`
     - `https://dilipvisuals.com`
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
     - `https://api.dilipvisuals.com/api/auth/google/callback`
5. Copy Client ID and Client Secret into your `.env` variables.

---

## 5. Backend Deployment (Render / Railway)

### Deploying to Render
1. Connect your GitHub repository to [Render](https://render.com).
2. Choose **Web Service**.
3. Configuration:
   - **Environment:** Node
   - **Build Command:** `npm install && npx prisma generate`
   - **Start Command:** `npx tsx server/server.ts`
4. Add all environment variables from Section 2 in the Render Dashboard.
5. Set health check path: `/api/health`.

---

## 6. Frontend Deployment (Vercel)

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Select **Vite** Framework Preset.
3. Configuration:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Add Environment Variables:
   - `VITE_BACKEND_URL`: `https://api.dilipvisuals.com` (your backend Render URL)
   - `VITE_AGENCY_NAME`: `DILIP VISUALS`
   - `VITE_AGENCY_PHONE`: `+91 9398769483`
   - `VITE_AGENCY_WHATSAPP_NUMBER`: `919398769483`
5. Click **Deploy**.

---

## 7. Custom Domain & SSL (dilipvisuals.com)

1. In Vercel Domains:
   - Add `dilipvisuals.com` and `www.dilipvisuals.com`.
   - Update DNS A Records to `76.76.21.21` at your domain registrar.
2. For Backend API:
   - Add CNAME record `api.dilipvisuals.com` pointing to your Render service address.
3. SSL Certificates are auto-provisioned via Let's Encrypt with automated HTTPS renewals.

---

## 8. Verification & Test Suite

Run the full automated test suite anytime:

```bash
# Run unit tests on all 22 database models, calculations, & RBAC:
npm run test:backend

# Run integration tests across Express endpoints:
npm run test:integration

# Test client production build:
npm run build
```

---

## 9. Default Seeded User Roles for Immediate Testing

| Portal | Role | Name | Email | Direct Features |
|---|---|---|---|---|
| `/admin` | `super_admin` | Dilip (Founder) | `dilip@dilipvisuals.com` | Full CMS, Invoices, Quotations, Analytics, Team |
| `/team/dashboard` | `team_member` | Arjun Verma | `editor@dilipvisuals.com` | Assigned projects, milestones, progress %, deliverables |
| `/dashboard` | `client` | Vikram Reddy | `vikram.techhub@gmail.com` | Timeline tracking, quotation approval, invoice PDF, revisions |

*(You can also switch instantly between roles using the Quick Switcher pill in the top corner of any portal)*.
