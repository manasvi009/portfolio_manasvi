// Simple contact form API that logs messages
// For production, integrate with your email service

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log to console (for development)
    console.log('New contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email using your email service
    // Options:
    // 1. Nodemailer + Gmail
    // 2. SendGrid API
    // 3. Mailgun API
    // 4. Resend API
    // 5. AWS SES

    return Response.json(
      { message: 'Message received! We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

