const { Resend } = require('resend');

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Validate API key on initialization
if (!process.env.RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY not set in environment variables');
  throw new Error('Resend API key not configured');
}

// Enhanced sendEmail function with retry logic
const sendEmailWithRetry = async (mailOptions, maxRetries = 3) => {
  const retryDelay = 1000; // 1 second initial delay
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await resend.emails.send({
        from: mailOptions.from,
        to: [mailOptions.to],
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html
      });
      
      console.log(`✅ Email sent successfully on attempt ${attempt} to ${mailOptions.to}`);
      console.log(`📬 Resend Message ID: ${result.data?.id}`);
      return result;
    } catch (error) {
      console.error(`❌ Email send attempt ${attempt} failed:`, error.message);
      
      // Log detailed error info in production
      if (process.env.NODE_ENV === 'production') {
        console.error('🔧 Production Email Error Details:', {
          to: mailOptions.to,
          from: mailOptions.from,
          subject: mailOptions.subject,
          error: error.message,
          code: error.statusCode || 'UNKNOWN',
          attempt: attempt,
          maxRetries: maxRetries
        });
      }
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        throw new Error(`Failed to send email after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt - 1)));
    }
  }
};

// Test Resend configuration
const testResendConnection = async () => {
  try {
    console.log('🧪 Testing Resend API connection...');
    console.log('🔑 API Key configured:', process.env.RESEND_API_KEY ? 'YES' : 'NO');
    
    // Test with a simple email
    const result = await sendEmailWithRetry({
      from: `DocShare <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: process.env.RESEND_TEST_EMAIL || process.env.RESEND_FROM_EMAIL,
      subject: '🧪 Resend API Test',
      text: 'This is a test email from Resend API.',
      html: '<p>This is a test email from Resend API.</p>'
    });
    
    console.log('✅ Resend API test successful!');
    return true;
  } catch (error) {
    console.error('❌ Resend API test failed:', error.message);
    return false;
  }
};

module.exports = { resend, sendEmailWithRetry, testResendConnection };

