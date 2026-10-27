import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;

if (env.SMTP.HOST && env.SMTP.USER) {
  transporter = nodemailer.createTransport({
    host: env.SMTP.HOST,
    port: env.SMTP.PORT,
    secure: env.SMTP.SECURE,
    auth: {
      user: env.SMTP.USER,
      pass: env.SMTP.PASS,
    },
  });
}

/**
 * Send notification email to the One Way Digital team
 * @param {Object} enquiry
 */
export async function sendTeamNotification(enquiry) {
  if (!transporter) {
    console.log('[Mailer] SMTP not configured. Team notification simulated:', {
      to: env.SMTP.TEAM_EMAIL,
      lead: enquiry.name,
      email: enquiry.email,
      service: enquiry.service,
    });
    return true;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #163550; background: #02060e; color: #ffffff;">
      <h2 style="color: #8ac616; margin-top: 0; text-transform: uppercase;">New Growth Inquiry Received!</h2>
      <p style="color: #f1f2f0;">A prospective client has submitted an inquiry on the website:</p>
      <hr style="border: none; border-top: 1px solid #163550; margin: 20px 0;" />
      <table style="width: 100%; border-collapse: collapse; color: #ffffff;">
        <tr><td style="padding: 8px 0; color: #8ac616; width: 140px;"><strong>Client Name:</strong></td><td>${enquiry.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #8ac616;"><strong>Email Address:</strong></td><td><a href="mailto:${enquiry.email}" style="color: #4ec2be;">${enquiry.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #8ac616;"><strong>Phone / WA:</strong></td><td>${enquiry.phone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px 0; color: #8ac616;"><strong>Selected Service:</strong></td><td>${enquiry.service}</td></tr>
        <tr><td style="padding: 8px 0; color: #8ac616;"><strong>IP Address:</strong></td><td>${enquiry.ip || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; color: #8ac616; vertical-align: top;"><strong>Message:</strong></td><td style="line-height: 1.5; white-space: pre-wrap;">${enquiry.message}</td></tr>
      </table>
      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #163550; font-size: 12px; color: #8391a0;">
        One Way Digital Media Lead Notification System • HSR Layout, Bangalore
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: env.SMTP.FROM,
      to: env.SMTP.TEAM_EMAIL,
      subject: `[New Lead] ${enquiry.name} - ${enquiry.service}`,
      html,
    });
    return true;
  } catch (err) {
    console.error('[Mailer] Error sending team email:', err.message);
    return false;
  }
}

/**
 * Send branded auto-reply to the client
 * @param {Object} enquiry
 */
export async function sendCustomerAutoReply(enquiry) {
  if (!transporter) {
    console.log('[Mailer] SMTP not configured. Customer auto-reply simulated for:', enquiry.email);
    return true;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #163550; background: #02060e; color: #ffffff;">
      <h1 style="color: #8ac616; font-size: 26px; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">ONE WAY DIGITAL MEDIA</h1>
      <p style="color: #4ec2be; font-weight: bold; font-size: 16px;">There's only One Way forward. Digital.</p>
      <hr style="border: none; border-top: 1px solid #163550; margin: 20px 0;" />
      <p>Hi ${enquiry.name},</p>
      <p style="line-height: 1.6; color: #f1f2f0;">
        Thank you for reaching out to <strong>One Way Digital Media</strong>. We have received your inquiry regarding <strong>${enquiry.service}</strong>.
      </p>
      <p style="line-height: 1.6; color: #f1f2f0;">
        One of our growth strategists is reviewing your details and will get back to you within 24 hours with custom recommendations and next steps.
      </p>
      <div style="background: #02223a; border-left: 4px solid #8ac616; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #d8e2ec;">
          Need faster assistance? WhatsApp us directly at <strong>+91 8122404837</strong> or reply to this email.
        </p>
      </div>
      <p style="color: #f1f2f0;">Best regards,<br /><strong style="color: #8ac616;">The One Way Digital Media Team</strong><br />HSR Layout, Bangalore</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: env.SMTP.FROM,
      to: enquiry.email,
      subject: `Thank you for contacting One Way Digital Media`,
      html,
    });
    return true;
  } catch (err) {
    console.error('[Mailer] Error sending customer auto-reply:', err.message);
    return false;
  }
}
