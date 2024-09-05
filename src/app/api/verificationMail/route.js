import nodemailer from 'nodemailer';
import { TokenGenerator } from '@/utils/TokenGenerator/TokenGenerator';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const POST = async (req, res) => {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const token = TokenGenerator();
    const verificationUrl = `${process.env.SITE_URL}/verify?token=${token}`;

    const mailOptions = {
      from: `"Your App" <${process.env.GMAIL_ADDRESS}>`,
      to: email,
      subject: 'Account Verification',
      html: `<p>Please verify your account by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
    }
}
