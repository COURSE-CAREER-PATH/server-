import nodemailer from 'nodemailer';

export default async function sendEmail(
  email: string,
  subject: string,
  text: string
): Promise<void> {
  // Ensure environment variables are correctly loaded
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.FROM_EMAIL) {
    console.error(
      "Environment variables EMAIL_USER, EMAIL_PASS, and FROM_EMAIL must be set"
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject,
    text,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", response);
  } catch (error: any) {
    console.error("Email not sent: ", error.message);
  }
}
