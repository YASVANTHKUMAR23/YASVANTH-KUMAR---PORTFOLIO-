import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // API Route for sending emails via EmailJS or Nodemailer SMTP
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      const targetEmail = 'yasvanthkumar2306@gmail.com';
      const emailSubject = subject || 'Portfolio Contact Inquiry';
      const formattedBody = `Name: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`;

      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
        `[Portfolio] ${emailSubject} - ${name}`
      )}&body=${encodeURIComponent(formattedBody)}`;

      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(
        `[Portfolio] ${emailSubject} - ${name}`
      )}&body=${encodeURIComponent(formattedBody)}`;

      // 1. EmailJS Credentials
      const serviceId =
        process.env.Email_JS ||
        process.env.EMAILJS_SERVICE_ID ||
        process.env.EMAIL_JS_SERVICE_ID ||
        'service_jvlpok3';
      const publicKey =
        process.env.EMAILJS_PUBLIC_KEY ||
        process.env.Email_JS_Public_Key ||
        process.env.EMAIL_JS_PUBLIC_KEY ||
        process.env.EMAILJS_USER_ID ||
        process.env.VITE_EMAILJS_PUBLIC_KEY;
      const templateId =
        process.env.EMAILJS_TEMPLATE_ID ||
        process.env.Email_JS_Template_ID ||
        process.env.EMAIL_JS_TEMPLATE_ID ||
        process.env.VITE_EMAILJS_TEMPLATE_ID;
      const accessToken =
        process.env.EMAILJS_PRIVATE_KEY ||
        process.env.EMAILJS_ACCESS_TOKEN ||
        process.env.Email_JS_Private_Key;

      // 2. Gmail / SMTP App Password Credentials
      const gmailUser = process.env.GMAIL_USER || targetEmail;
      const gmailAppPassword =
        process.env.GMAIL_APP_PASSWORD ||
        process.env.GMAIL_PASS ||
        process.env.SMTP_PASSWORD;

      console.log(`[Contact Submission] Received inquiry from ${name} (${email})`);
      console.log(
        `[Email Diagnostics] EmailJS serviceId: ${serviceId ? 'Present' : 'Missing'}, publicKey: ${
          publicKey ? 'Present' : 'Missing'
        }, templateId: ${templateId ? 'Present' : 'Missing'}, GmailSMTP: ${
          gmailAppPassword ? 'Configured' : 'Not configured'
        }`
      );

      let emailDelivered = false;
      let deliveryMethod: 'emailjs' | 'nodemailer' | null = null;
      let deliveryError: string | null = null;

      // Try Option A: Nodemailer (if Gmail App Password is provided)
      if (gmailAppPassword) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: gmailUser,
              pass: gmailAppPassword.replace(/\s+/g, ''), // Strip spaces if pasted as "xxxx xxxx xxxx xxxx"
            },
          });

          await transporter.sendMail({
            from: `"${name} (Portfolio)" <${gmailUser}>`,
            to: targetEmail,
            replyTo: email,
            subject: `[Portfolio Inquiry] ${emailSubject} - from ${name}`,
            text: formattedBody,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 16px;">
                <h2 style="color: #0f172a; margin-top: 0;">New Direct Message from Portfolio</h2>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 4px 0;"><strong>Sender Name:</strong> ${name}</p>
                  <p style="margin: 4px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p style="margin: 4px 0;"><strong>Subject:</strong> ${emailSubject}</p>
                </div>
                <h3 style="color: #334155; margin-bottom: 8px;">Message:</h3>
                <div style="white-space: pre-wrap; background: #ffffff; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px; color: #1e293b; line-height: 1.6;">
${message}
                </div>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
                  Delivered securely from your portfolio backend to ${targetEmail}
                </div>
              </div>
            `,
          });

          emailDelivered = true;
          deliveryMethod = 'nodemailer';
          console.log('[Email Service] Email dispatched successfully via Gmail SMTP (Nodemailer).');
        } catch (smtpErr: any) {
          console.error('[Email Service] Nodemailer SMTP error:', smtpErr);
          deliveryError = `SMTP error: ${smtpErr?.message || 'Failed to authenticate'}`;
        }
      }

      // Try Option B: EmailJS (if public key is available or provided)
      if (!emailDelivered && serviceId && publicKey) {
        try {
          const emailJsPayload: Record<string, unknown> = {
            service_id: serviceId,
            template_id: templateId || 'template_default',
            user_id: publicKey,
            template_params: {
              to_email: targetEmail,
              to_name: 'Yasvanth Kumar',
              from_name: name,
              from_email: email,
              reply_to: email,
              subject: emailSubject,
              message: message,
            },
          };

          if (accessToken) {
            emailJsPayload.accessToken = accessToken;
          }

          const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Yasvanth-Portfolio/1.0',
            },
            body: JSON.stringify(emailJsPayload),
          });

          const resText = await response.text();
          if (response.ok) {
            emailDelivered = true;
            deliveryMethod = 'emailjs';
            console.log('[Email Service] Email dispatched successfully via EmailJS:', resText);
          } else {
            console.warn(`[Email Service] EmailJS response status ${response.status}: ${resText}`);
            deliveryError = `EmailJS error (${response.status}): ${resText}`;
          }
        } catch (err: any) {
          console.error('[Email Service] Error communicating with EmailJS:', err);
          deliveryError = err?.message || 'Network error reaching EmailJS';
        }
      }

      // If delivery failed or required keys are missing, inform caller honestly with fallback
      if (!emailDelivered) {
        const missingKeys: string[] = [];
        if (!publicKey) missingKeys.push('EMAILJS_PUBLIC_KEY');
        if (!templateId) missingKeys.push('EMAILJS_TEMPLATE_ID');

        console.warn(
          `[Email Service] Notice: Automated background email delivery is not fully configured (missing: ${missingKeys.join(
            ', '
          )}). Returning mailto and compose fallbacks.`
        );

        return res.status(200).json({
          success: false,
          emailDelivered: false,
          serviceIdConfigured: !!serviceId,
          missingKeys,
          error:
            deliveryError ||
            'EmailJS requires EMAILJS_PUBLIC_KEY and EMAILJS_TEMPLATE_ID in Secrets to send background emails without opening your mail app.',
          mailtoUrl,
          gmailComposeUrl,
          details: {
            recipient: targetEmail,
            sender: { name, email },
            subject: emailSubject,
          },
        });
      }

      // Successful dispatch
      return res.status(200).json({
        success: true,
        emailDelivered: true,
        method: deliveryMethod,
        message: 'Your message has been sent successfully to Yasvanth Kumar.',
        details: {
          recipient: targetEmail,
          sender: { name, email },
          subject: emailSubject,
        },
      });
    } catch (error) {
      console.error('[Contact Error]', error);
      return res.status(500).json({
        success: false,
        emailDelivered: false,
        error: 'An internal error occurred while processing your message.',
      });
    }
  });

  // Health check endpoint with diagnostic information
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasEmailServiceId: !!(process.env.Email_JS || process.env.EMAILJS_SERVICE_ID),
      hasEmailPublicKey: !!(process.env.EMAILJS_PUBLIC_KEY || process.env.Email_JS_Public_Key),
      hasEmailTemplateId: !!(process.env.EMAILJS_TEMPLATE_ID || process.env.Email_JS_Template_ID),
      hasGmailAppPassword: !!(process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS),
      targetEmail: 'yasvanthkumar2306@gmail.com',
      timestamp: new Date().toISOString(),
    });
  });

  // In production, serve built static files from dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev, use Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
