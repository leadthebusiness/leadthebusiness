import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, message } = await request.json();

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Contact Form <contact@resend.dev>',
      to: ['info@leadthebusiness.in'],
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f4d03f; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="color: #6c757d; font-size: 12px;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully:', data);
    // Return success response

    return NextResponse.json({ message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}