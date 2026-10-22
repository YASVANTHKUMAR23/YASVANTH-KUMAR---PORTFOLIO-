/**
 * Robust Email Delivery Service
 *
 * Implements dual-dispatch:
 * 1. Primary: Secure backend route (/api/contact) running on Express
 * 2. Fail-Safe: Direct browser-to-EmailJS dispatch if /api/contact returns 404 (e.g. static CDN deployments)
 * 3. Fallback: Formats Gmail compose and mailto URLs
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface DeliveryResult {
  success: boolean;
  emailDelivered: boolean;
  method?: 'server-emailjs' | 'server-nodemailer' | 'client-emailjs';
  error?: string;
  mailtoUrl?: string;
  gmailComposeUrl?: string;
}

const TARGET_EMAIL = 'yasvanthkumar2306@gmail.com';

// Read credentials baked in by Vite define or environment
const EMAILJS_SERVICE_ID =
  (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || 'service_jvlpok3';
const EMAILJS_PUBLIC_KEY =
  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || '';
const EMAILJS_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || 'template_mbno1sz';

export async function sendContactMessage(payload: ContactPayload): Promise<DeliveryResult> {
  const { name, email, subject, message } = payload;
  const cleanSubject = subject || 'Portfolio Contact Inquiry';
  const formattedBody = `Name: ${name}\nEmail: ${email}\nSubject: ${cleanSubject}\n\nMessage:\n${message}`;

  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
    `[Portfolio] ${cleanSubject} - ${name}`
  )}&body=${encodeURIComponent(formattedBody)}`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=${encodeURIComponent(
    `[Portfolio] ${cleanSubject} - ${name}`
  )}&body=${encodeURIComponent(formattedBody)}`;

  // --- Step 1: Attempt Server Route (/api/contact) ---
  try {
    const serverResponse = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (serverResponse.ok) {
      const serverData = await serverResponse.json().catch(() => ({}));
      if (serverData.emailDelivered) {
        return {
          success: true,
          emailDelivered: true,
          method: serverData.method === 'nodemailer' ? 'server-nodemailer' : 'server-emailjs',
        };
      }
    } else {
      console.warn(`[EmailService] /api/contact responded with HTTP ${serverResponse.status}. Falling back to browser EmailJS dispatch.`);
    }
  } catch (serverErr) {
    console.warn('[EmailService] Server /api/contact unreachable. Falling back to browser EmailJS dispatch:', serverErr);
  }

  // --- Step 2: Fail-Safe Browser-to-EmailJS Direct Dispatch ---
  // If /api/contact returned 404 (e.g. static hosting) or failed, send directly from client
  if (EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY) {
    try {
      const emailJsPayload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: TARGET_EMAIL,
          to_name: 'Yasvanth Kumar',
          from_name: name,
          name: name,
          user_name: name,
          from_email: email,
          email: email,
          user_email: email,
          reply_to: email,
          subject: cleanSubject,
          email_subject: cleanSubject,
          message: message,
          message_html: message.replace(/\n/g, '<br/>'),
        },
      };

      const directRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailJsPayload),
      });

      if (directRes.ok) {
        console.log('[EmailService] Dispatched directly to inbox via browser EmailJS client.');
        return {
          success: true,
          emailDelivered: true,
          method: 'client-emailjs',
        };
      } else {
        const errorText = await directRes.text();
        console.warn(`[EmailService] Direct EmailJS response ${directRes.status}:`, errorText);
      }
    } catch (clientErr: any) {
      console.error('[EmailService] Direct browser EmailJS error:', clientErr);
    }
  }

  // --- Step 3: Fallback to mailto and Gmail compose ---
  return {
    success: false,
    emailDelivered: false,
    mailtoUrl,
    gmailComposeUrl,
    error: 'Direct email dispatch is pending credentials. Open in your mail app below.',
  };
}
