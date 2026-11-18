import { prisma } from '../prisma';

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  templateType?: string;
  metadata?: Record<string, any>;
}

export interface EmailSendResult {
  success: boolean;
  id?: string;
  error?: string;
  recipient: string;
  timestamp: string;
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'dilipvisuals@gmail.com';
}

export function getFromEmail(): string {
  const configuredFrom = process.env.EMAIL_FROM?.trim();
  if (configuredFrom && configuredFrom.length > 0) {
    if (configuredFrom.includes('<') && configuredFrom.includes('>')) {
      return configuredFrom;
    }
    return `Dilip Visuals <${configuredFrom}>`;
  }
  // Standard Resend onboarding domain fallback for reliable delivery
  return 'Dilip Visuals <onboarding@resend.dev>';
}

/**
 * Core Resend Dispatcher
 * Sends an email via Resend API and stores an audit delivery log in database.
 * NEVER prints API keys in logs or errors.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = getFromEmail();
  const recipients = Array.isArray(payload.to) ? payload.to : [payload.to];
  const recipientStr = recipients.join(', ');
  const timestamp = new Date().toISOString();
  const templateType = payload.templateType || 'TRANSACTIONAL';

  console.log(`[Email Service] Initiating dispatch to: [${recipientStr}] | Subject: "${payload.subject}" | Template: ${templateType}`);

  if (!apiKey || apiKey.startsWith('re_your_resend')) {
    const errorMsg = 'RESEND_API_KEY is not configured in backend environment.';
    console.warn(`[Email Service Simulation] ${errorMsg}`);
    
    // Log simulation in database
    await logEmailDelivery({
      to: recipientStr,
      from: fromEmail,
      subject: payload.subject,
      templateType,
      status: 'SIMULATED',
      errorMessage: errorMsg,
      metadata: payload.metadata
    });

    return {
      success: true,
      id: `sim-${Date.now()}`,
      recipient: recipientStr,
      timestamp
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject: payload.subject,
        html: payload.html,
        text: payload.text
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errDetail = data?.message || `Resend API returned HTTP ${response.status}`;
      console.error(`[Email Service Error] Failed to send email to [${recipientStr}]: ${errDetail}`);

      await logEmailDelivery({
        to: recipientStr,
        from: fromEmail,
        subject: payload.subject,
        templateType,
        status: 'FAILED',
        errorMessage: errDetail,
        metadata: payload.metadata
      });

      return {
        success: false,
        error: errDetail,
        recipient: recipientStr,
        timestamp
      };
    }

    const resendId = data.id || `resend-${Date.now()}`;
    console.log(`[Email Service Success] Accepted by Resend! Message ID: ${resendId} to [${recipientStr}]`);

    // Log success in database
    await logEmailDelivery({
      to: recipientStr,
      from: fromEmail,
      subject: payload.subject,
      templateType,
      status: 'SENT',
      resendId,
      metadata: payload.metadata
    });

    return {
      success: true,
      id: resendId,
      recipient: recipientStr,
      timestamp
    };
  } catch (error: any) {
    const networkError = error?.message || 'Network error connecting to Resend';
    console.error(`[Email Service Network Error] ${networkError}`);

    await logEmailDelivery({
      to: recipientStr,
      from: fromEmail,
      subject: payload.subject,
      templateType,
      status: 'FAILED',
      errorMessage: networkError,
      metadata: payload.metadata
    });

    return {
      success: false,
      error: networkError,
      recipient: recipientStr,
      timestamp
    };
  }
}

/**
 * Audit log helper that writes delivery records to Prisma EmailLog
 */
async function logEmailDelivery(record: {
  to: string;
  from: string;
  subject: string;
  templateType: string;
  status: string;
  resendId?: string;
  errorMessage?: string;
  metadata?: any;
}) {
  try {
    await prisma.emailLog.create({
      data: {
        to: record.to,
        from: record.from,
        subject: record.subject,
        templateType: record.templateType,
        status: record.status,
        resendId: record.resendId || null,
        errorMessage: record.errorMessage || null,
        metadata: record.metadata ? JSON.stringify(record.metadata) : null
      }
    });
  } catch (err: any) {
    console.error('[Email Logger Error] Could not save email log to database:', err.message);
  }
}

// =========================================================================
// EMAIL TEMPLATES & NOTIFICATION DISPATCHERS
// =========================================================================

const BRAND_WRAPPER = (title: string, bodyContent: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08090D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #08090D; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0F111A; border: 1px solid #1E2233; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);" cellspacing="0" cellpadding="0">
          <!-- Brand Header -->
          <tr>
            <td style="background-color: #08090D; padding: 24px 32px; border-bottom: 2px solid #D4AF37;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 900; letter-spacing: 1px; color: #D4AF37; display: block;">DILIP VISUALS</span>
                    <span style="font-size: 11px; font-weight: 700; color: #F3E5AB; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; display: block;">Let's create something extraordinary.</span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; color: #D4AF37; background-color: #141724; padding: 4px 10px; border-radius: 6px; border: 1px solid #332711;">HYDERABAD STUDIO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0A0C13; padding: 24px 32px; border-top: 1px solid #1A1E2B; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #9CA3AF;">
                <strong>DILIP VISUALS</strong> • Creative Digital Agency • Hyderabad, Telangana, India
              </p>
              <p style="margin: 0; font-size: 11px; color: #6B7280;">
                Official WhatsApp: <a href="https://wa.me/919398769483" style="color: #A78BFA; text-decoration: none;">+91 9398769483</a> • 
                Direct Email: <a href="mailto:dilipvisuals@gmail.com" style="color: #A78BFA; text-decoration: none;">dilipvisuals@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * 1. Admin Notification: New Website Enquiry
 */
export async function sendEnquiryNotificationToAdmin(enquiry: {
  enquiryNumber: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  country: string;
  service: string;
  package?: string | null;
  budgetRange?: string | null;
  expectedDeadline?: string | null;
  description: string;
  preferredContact: string;
}): Promise<EmailSendResult> {
  const adminEmail = getAdminEmail();
  const whatsappUrl = `https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enquiry.name}! This is Dilip from Dilip Visuals regarding your inquiry [${enquiry.enquiryNumber}] for ${enquiry.service}.`)}`;

  const body = `
    <div style="background-color: #141724; border-left: 4px solid #8B5CF6; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">
        🔔 New Project Enquiry Received
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        Reference: <strong style="color: #A78BFA; font-family: monospace;">${enquiry.enquiryNumber}</strong>
      </p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233; width: 40%;">Client Name:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E2233;">${enquiry.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Email Address:</td>
        <td style="padding: 10px 0; color: #A78BFA; border-bottom: 1px solid #1E2233;"><a href="mailto:${enquiry.email}" style="color: #A78BFA; text-decoration: none;">${enquiry.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Phone / WhatsApp:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #1E2233;">${enquiry.phone}</td>
      </tr>
      ${enquiry.company ? `
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Company / Brand:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${enquiry.company}</td>
      </tr>` : ''}
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Service Requested:</td>
        <td style="padding: 10px 0; color: #06B6D4; font-weight: 700; border-bottom: 1px solid #1E2233;">${enquiry.service} ${enquiry.package ? `(${enquiry.package})` : ''}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Budget Range:</td>
        <td style="padding: 10px 0; color: #10B981; font-weight: 700; border-bottom: 1px solid #1E2233;">${enquiry.budgetRange || 'Flexible / Custom'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Expected Deadline:</td>
        <td style="padding: 10px 0; color: #F59E0B; font-weight: 700; border-bottom: 1px solid #1E2233;">${enquiry.expectedDeadline || 'Flexible'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Preferred Contact:</td>
        <td style="padding: 10px 0; color: #FFFFFF; text-transform: uppercase; font-weight: 600; border-bottom: 1px solid #1E2233;">${enquiry.preferredContact}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Country:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${enquiry.country}</td>
      </tr>
    </table>

    <div style="background-color: #12141F; border: 1px solid #1E2233; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Client Project Description:</span>
      <p style="margin: 0; font-size: 13px; color: #E5E7EB; line-height: 1.6; white-space: pre-wrap;">${enquiry.description}</p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 6px 0;">
          <a href="${whatsappUrl}" style="background-color: #10B981; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; display: inline-block; margin-right: 10px;">
            💬 Chat With Client on WhatsApp
          </a>
          <a href="mailto:${enquiry.email}?subject=${encodeURIComponent(`Dilip Visuals - Project Enquiry [${enquiry.enquiryNumber}]`)}" style="background-color: #8B5CF6; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; display: inline-block;">
            ✉️ Reply via Email
          </a>
        </td>
      </tr>
    </table>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Client Enquiry – Dilip Visuals`,
    html: BRAND_WRAPPER('New Client Enquiry', body),
    templateType: 'ENQUIRY_ADMIN',
    metadata: { enquiryNumber: enquiry.enquiryNumber, email: enquiry.email }
  });
}

/**
 * 2. Client Automatic Acknowledgement Email
 */
export async function sendEnquiryAcknowledgementToClient(enquiry: {
  enquiryNumber: string;
  name: string;
  email: string;
  service: string;
  preferredContact: string;
}): Promise<EmailSendResult> {
  const body = `
    <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #FFFFFF;">
      Hello ${enquiry.name},
    </h2>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #D1D5DB; line-height: 1.6;">
      Thank you for reaching out to <strong>DILIP VISUALS</strong>. We have successfully logged your creative project enquiry for <strong>${enquiry.service}</strong>.
    </p>

    <div style="background-color: #141724; border: 1px solid #232738; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px;">
        <tr>
          <td style="color: #9CA3AF; padding: 6px 0;">Reference ID:</td>
          <td style="color: #A78BFA; font-weight: 700; font-family: monospace; text-align: right;">${enquiry.enquiryNumber}</td>
        </tr>
        <tr>
          <td style="color: #9CA3AF; padding: 6px 0;">Service Area:</td>
          <td style="color: #FFFFFF; font-weight: 600; text-align: right;">${enquiry.service}</td>
        </tr>
        <tr>
          <td style="color: #9CA3AF; padding: 6px 0;">Review Status:</td>
          <td style="color: #10B981; font-weight: 700; text-align: right;">In Creative Review</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 13px; color: #D1D5DB; line-height: 1.6; margin-bottom: 24px;">
      Our Creative Director will review your project requirements and connect with you via <strong>${enquiry.preferredContact.toUpperCase()}</strong> within 24 business hours to share tailored proposals and timeline recommendations.
    </p>

    <div style="text-align: center; margin-bottom: 12px;">
      <a href="https://wa.me/919398769483?text=${encodeURIComponent(`Hello Dilip Visuals! I submitted enquiry ${enquiry.enquiryNumber}. I'd love to discuss my project.`)}" style="background-color: #10B981; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block;">
        💬 Chat on WhatsApp (+91 9398769483)
      </a>
    </div>
  `;

  return sendEmail({
    to: enquiry.email,
    subject: `Thank you for contacting Dilip Visuals!`,
    html: BRAND_WRAPPER('Thank you for contacting Dilip Visuals', body),
    templateType: 'ENQUIRY_ACK_CLIENT',
    metadata: { enquiryNumber: enquiry.enquiryNumber }
  });
}

/**
 * 3. Admin Notification: Project Requested / Created
 */
export async function sendProjectNotificationToAdmin(project: {
  projectNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  budget?: any;
}): Promise<EmailSendResult> {
  const adminEmail = getAdminEmail();
  const body = `
    <div style="background-color: #141724; border-left: 4px solid #06B6D4; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">
        🎬 New Project Initialized
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        Project ID: <strong style="color: #06B6D4; font-family: monospace;">${project.projectNumber}</strong>
      </p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Project Title:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E2233;">${project.title}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Client:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${project.clientName} (${project.clientEmail})</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Service Category:</td>
        <td style="padding: 10px 0; color: #A78BFA; font-weight: 600; border-bottom: 1px solid #1E2233;">${project.serviceType}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Project Budget:</td>
        <td style="padding: 10px 0; color: #10B981; font-weight: 700; border-bottom: 1px solid #1E2233;">₹${Number(project.budget || 0).toLocaleString('en-IN')}</td>
      </tr>
    </table>

    <div style="text-align: center;">
      <a href="http://localhost:5173/admin?tab=projects" style="background-color: #8B5CF6; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block;">
        View Project in Admin Console
      </a>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `[New Project] ${project.title} (${project.projectNumber})`,
    html: BRAND_WRAPPER('New Project', body),
    templateType: 'PROJECT_REQUEST',
    metadata: { projectNumber: project.projectNumber }
  });
}

/**
 * 4. Admin Notification: New Client Registration
 */
export async function sendNewClientRegistrationAlertToAdmin(client: {
  name: string;
  email: string;
  businessName?: string | null;
  country?: string | null;
}): Promise<EmailSendResult> {
  const adminEmail = getAdminEmail();
  const body = `
    <div style="background-color: #141724; border-left: 4px solid #10B981; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">
        👤 New Client Account Created
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        A new creator or brand partner just registered on the portal.
      </p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Name:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E2233;">${client.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Email:</td>
        <td style="padding: 10px 0; color: #A78BFA; font-weight: 600; border-bottom: 1px solid #1E2233;">${client.email}</td>
      </tr>
      ${client.businessName ? `
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Business Name:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${client.businessName}</td>
      </tr>` : ''}
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Country:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${client.country || 'India'}</td>
      </tr>
    </table>

    <div style="text-align: center;">
      <a href="http://localhost:5173/admin?tab=clients" style="background-color: #8B5CF6; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block;">
        View Clients in Admin
      </a>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `[New Client] ${client.name} registered on Dilip Visuals`,
    html: BRAND_WRAPPER('New Client Registration', body),
    templateType: 'CLIENT_REGISTRATION',
    metadata: { clientEmail: client.email }
  });
}

/**
 * 5. Admin Notification: Revision Request
 */
export async function sendRevisionRequestAlertToAdmin(params: {
  projectNumber: string;
  projectTitle: string;
  clientName: string;
  revisionTitle: string;
  description: string;
  timecodes?: string | null;
  priority: string;
}): Promise<EmailSendResult> {
  const adminEmail = getAdminEmail();
  const isUrgent = params.priority === 'urgent';

  const body = `
    <div style="background-color: #141724; border-left: 4px solid ${isUrgent ? '#EF4444' : '#F59E0B'}; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">
        🔄 Revision Requested ${isUrgent ? '<span style="color: #EF4444; font-size: 13px; font-weight: 900; background: rgba(239, 68, 68, 0.2); padding: 3px 8px; border-radius: 4px;">[URGENT]</span>' : ''}
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        Project: <strong style="color: #A78BFA;">${params.projectTitle}</strong> (${params.projectNumber})
      </p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Revision Focus:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E2233;">${params.revisionTitle}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Client:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${params.clientName}</td>
      </tr>
      ${params.timecodes ? `
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Specific Timecodes:</td>
        <td style="padding: 10px 0; color: #06B6D4; font-family: monospace; font-weight: 700; border-bottom: 1px solid #1E2233;">${params.timecodes}</td>
      </tr>` : ''}
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Priority:</td>
        <td style="padding: 10px 0; color: ${isUrgent ? '#EF4444' : '#10B981'}; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #1E2233;">${params.priority}</td>
      </tr>
    </table>

    <div style="background-color: #12141F; border: 1px solid #1E2233; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <span style="font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Client Feedback Instructions:</span>
      <p style="margin: 0; font-size: 13px; color: #E5E7EB; line-height: 1.6; white-space: pre-wrap;">${params.description}</p>
    </div>

    <div style="text-align: center;">
      <a href="http://localhost:5173/admin?tab=projects" style="background-color: #8B5CF6; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block;">
        Open Project Workspace
      </a>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `[Revision Request] ${params.projectTitle} – ${params.revisionTitle}`,
    html: BRAND_WRAPPER('Revision Request', body),
    templateType: 'REVISION_REQUEST',
    metadata: { projectNumber: params.projectNumber, priority: params.priority }
  });
}

/**
 * 6. Admin Notification: File Upload by Client
 */
export async function sendFileUploadAlertToAdmin(params: {
  projectNumber: string;
  projectTitle: string;
  clientName: string;
  fileName: string;
  fileSize?: string | null;
  category: string;
}): Promise<EmailSendResult> {
  const adminEmail = getAdminEmail();
  const body = `
    <div style="background-color: #141724; border-left: 4px solid #8B5CF6; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">
        📁 New Reference Assets Uploaded
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        Project: <strong style="color: #A78BFA;">${params.projectTitle}</strong> (${params.projectNumber})
      </p>
    </div>

    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Asset File Name:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E2233;">${params.fileName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Uploaded By:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${params.clientName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Category:</td>
        <td style="padding: 10px 0; color: #06B6D4; font-weight: 600; border-bottom: 1px solid #1E2233;">${params.category}</td>
      </tr>
      ${params.fileSize ? `
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">File Size:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${params.fileSize}</td>
      </tr>` : ''}
    </table>

    <div style="text-align: center;">
      <a href="http://localhost:5173/admin?tab=projects" style="background-color: #8B5CF6; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block;">
        View Uploaded Files
      </a>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `[New File] Assets uploaded for ${params.projectTitle}`,
    html: BRAND_WRAPPER('New File Uploaded', body),
    templateType: 'FILE_UPLOAD',
    metadata: { projectNumber: params.projectNumber, fileName: params.fileName }
  });
}

/**
 * 7. Client Notification: New Master Deliverable Uploaded
 */
export async function sendDeliverableAlertToClient(params: {
  clientEmail: string;
  clientName: string;
  projectNumber: string;
  projectTitle: string;
  deliverableTitle: string;
  fileSize?: string | null;
}): Promise<EmailSendResult> {
  const body = `
    <div style="background-color: #141724; border-left: 4px solid #10B981; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #FFFFFF;">
        ✨ Master Deliverable Ready for Review
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        Project: <strong style="color: #A78BFA;">${params.projectTitle}</strong> (${params.projectNumber})
      </p>
    </div>

    <p style="font-size: 14px; color: #D1D5DB; line-height: 1.6; margin-bottom: 20px;">
      Hello <strong>${params.clientName}</strong>, our creative production pod has uploaded a new deliverable: <strong>${params.deliverableTitle}</strong>.
    </p>

    <div style="background-color: #12141F; border: 1px solid #1E2233; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <span style="font-size: 12px; color: #9CA3AF;">File Description:</span>
      <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 700; color: #FFFFFF;">
        ${params.deliverableTitle} ${params.fileSize ? `(${params.fileSize})` : ''}
      </p>
    </div>

    <div style="text-align: center;">
      <a href="http://localhost:5173/dashboard/files" style="background-color: #8B5CF6; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block;">
        Download & Review in Portal
      </a>
    </div>
  `;

  return sendEmail({
    to: params.clientEmail,
    subject: `[Deliverable Ready] ${params.deliverableTitle} – Dilip Visuals`,
    html: BRAND_WRAPPER('New Deliverable Ready', body),
    templateType: 'FILE_UPLOAD',
    metadata: { projectNumber: params.projectNumber }
  });
}

/**
 * 8. Test Email Dispatcher
 */
export async function sendTestEmail(targetEmail?: string): Promise<EmailSendResult> {
  const recipient = targetEmail || getAdminEmail();
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const body = `
    <div style="background-color: #141724; border-left: 4px solid #10B981; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #10B981;">
        ✔ Resend Transactional Email Verification
      </h2>
      <p style="margin: 0; font-size: 13px; color: #D1D5DB;">
        Testing backend email delivery engine for <strong>DILIP VISUALS</strong>.
      </p>
    </div>

    <p style="font-size: 14px; color: #D1D5DB; line-height: 1.6; margin-bottom: 20px;">
      This email was triggered directly from the <strong>Dilip Visuals Admin Console</strong> to verify that your Resend API credentials, templates, and delivery pipelines are active.
    </p>

    <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 24px; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Target Recipient:</td>
        <td style="padding: 10px 0; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E2233;">${recipient}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Sender Address:</td>
        <td style="padding: 10px 0; color: #A78BFA; font-family: monospace; border-bottom: 1px solid #1E2233;">${getFromEmail()}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Dispatched At:</td>
        <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid #1E2233;">${timestamp} (IST)</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #9CA3AF; border-bottom: 1px solid #1E2233;">Status:</td>
        <td style="padding: 10px 0; color: #10B981; font-weight: 800; border-bottom: 1px solid #1E2233;">ACCEPTED & VERIFIED</td>
      </tr>
    </table>

    <div style="background-color: #0A0C13; border: 1px solid #1E2233; border-radius: 8px; padding: 14px; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
        Ready for production email dispatch across all client touchpoints.
      </p>
    </div>
  `;

  return sendEmail({
    to: recipient,
    subject: `DILIP VISUALS — Resend Email Delivery Test [${new Date().toLocaleTimeString()}]`,
    html: BRAND_WRAPPER('Resend Delivery Test', body),
    templateType: 'TEST_EMAIL',
    metadata: { testRecipient: recipient }
  });
}

// In-app notification creation helper
export async function createNotification(
  userId: string | null,
  title: string,
  message: string,
  type: 'PROJECT' | 'QUOTATION' | 'INVOICE' | 'ENQUIRY' | 'FILE' | 'SYSTEM',
  link?: string
) {
  try {
    return await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        link
      }
    });
  } catch (err: any) {
    console.error('[Notification Error]', err.message);
  }
}
