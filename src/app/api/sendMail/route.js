import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Handle POST request
export const POST = async (req, email) => {
  console.log('Node Mailer request');
  try {
    // Parse the request body
    const {email, subject, message } = await req.json();

    // Send email with defined transport object
    const info = await transporter.sendMail({
      from: `"Blog Online CRUD 👻" <system-mailer-crud@gmail.com>`, // Sender address
      to: email, // List of receivers
      subject: subject || "Default Subject", // Subject line
      text: message || "Default message", // Plain text body
      html: `<b>${message || "Default message"}</b>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: `Failed to Send Email: ${error.message}` }, { status: 500 });
  }
};
