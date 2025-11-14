import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Yggrasoft Labs <noreply@yggrasoft.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
};

export const sendContactNotification = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<boolean> => {
  try {
    const adminEmail = process.env.CONTACT_EMAIL || 'contact@yggrasoft.com';

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8C7231 0%, #365265 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8C7231; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌳 New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span> ${name}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${email}
          </div>
          <div class="field">
            <span class="label">Subject:</span> ${subject || 'No subject'}
          </div>
          <div class="field">
            <span class="label">Message:</span>
            <p>${message}</p>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Yggrasoft Labs contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject'}

Message:
${message}

---
This email was sent from the Yggrasoft Labs contact form.
  `;

    console.log(`📧 Sending admin notification for contact from ${name} (${email})`);
    const success = await sendEmail({
      to: adminEmail,
      subject: `New Contact: ${subject || 'No subject'}`,
      text: textContent,
      html: htmlContent,
    });

    if (success) {
      console.log(`✅ Admin notification sent successfully to ${adminEmail}`);
    } else {
      console.error(`❌ Failed to send admin notification to ${adminEmail}`);
    }

    return success;
  } catch (error) {
    console.error('❌ Error in sendContactNotification:', error);
    return false;
  }
};

export const sendContactConfirmation = async (
  name: string,
  email: string
): Promise<boolean> => {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8C7231 0%, #365265 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🌳 Thank You for Contacting Us</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Yggrasoft Labs. We have received your message and will get back to you as soon as possible.</p>
          <p>Our team typically responds within 24-48 hours during business days.</p>
          <p>Best regards,<br>The Yggrasoft Labs Team</p>
        </div>
        <div class="footer">
          <p>Yggrasoft Labs - Connecting Realms of Innovation</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const textContent = `
Dear ${name},

Thank you for reaching out to Yggrasoft Labs. We have received your message and will get back to you as soon as possible.

Our team typically responds within 24-48 hours during business days.

Best regards,
The Yggrasoft Labs Team

---
Yggrasoft Labs - Connecting Realms of Innovation
  `;

    console.log(`📧 Sending confirmation email to ${name} (${email})`);
    const success = await sendEmail({
      to: email,
      subject: 'Thank you for contacting Yggrasoft Labs',
      text: textContent,
      html: htmlContent,
    });

    if (success) {
      console.log(`✅ Confirmation email sent successfully to ${email}`);
    } else {
      console.error(`❌ Failed to send confirmation email to ${email}`);
    }

    return success;
  } catch (error) {
    console.error('❌ Error in sendContactConfirmation:', error);
    return false;
  }
};
