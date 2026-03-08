const express = require('express');
const router = express.Router();
const { sendEmailWithRetry, testResendConnection } = require('../config/mailer');

// Test email configuration endpoint
router.post('/test-email', async (req, res) => {
  try {
    const { testEmail } = req.body;
    const targetEmail = testEmail || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    console.log('🧪 Testing Resend email service...');
    console.log('📧 Target email:', targetEmail);
    console.log('🔧 Resend API Key configured:', process.env.RESEND_API_KEY ? 'YES' : 'NO');
    console.log('📨 From email:', process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev');
    console.log('🌍 Environment:', process.env.NODE_ENV);
    
    const testOTP = '123456'; // Test OTP
    const result = await sendEmailWithRetry({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: targetEmail,
      subject: '🧪 DocShare Email Service Test',
      text: `This is a test email from DocShare backend.\n\nTest OTP: ${testOTP}\n\nIf you receive this, email service is working correctly.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px">
          <h2 style="color:#0F172A;margin-bottom:4px">🧪 Email Service Test</h2>
          <p style="color:#475569">This is a test email from DocShare backend.</p>
          <div style="background:#F1F5F9;border-radius:12px;padding:24px;text-align:center;margin:20px 0">
            <span style="font-size:40px;font-weight:700;letter-spacing:14px;color:#C9A227;font-family:monospace">${testOTP}</span>
          </div>
          <p style="color:#94A3B8;font-size:12px">If you receive this, email service is working correctly.</p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0">
          <p style="color:#64748B;font-size:11px">
            <strong>Debug Info:</strong><br>
            Environment: ${process.env.NODE_ENV}<br>
            Email Service: Resend API<br>
            From Email: ${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}<br>
            Timestamp: ${new Date().toISOString()}
          </p>
        </div>
      `,
    });
    
    console.log('✅ Test email sent successfully:', result.data?.id);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      details: {
        targetEmail,
        messageId: result.data?.id,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        emailConfigured: !!process.env.RESEND_API_KEY
      }
    });
    
  } catch (error) {
    console.error('❌ Test email failed:', error);
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: {
        environment: process.env.NODE_ENV,
        emailUserConfigured: !!process.env.RESEND_API_KEY,
        emailPassConfigured: !!process.env.RESEND_FROM_EMAIL,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Email configuration check endpoint
router.get('/email-config', (req, res) => {
  const config = {
    environment: process.env.NODE_ENV,
    resendApiKey: process.env.RESEND_API_KEY ? 'CONFIGURED' : 'NOT SET',
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    emailService: 'Resend API',
    timestamp: new Date().toISOString()
  };
  
  console.log('🔍 Email configuration check:', config);
  
  res.json({
    success: true,
    config
  });
});

// Test Resend API connection
router.get('/test-resend', async (req, res) => {
  try {
    console.log('🧪 Starting Resend API connection test...');
    const success = await testResendConnection();
    
    if (success) {
      res.json({
        success: true,
        message: 'Resend API connection test passed',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Resend API connection test failed',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Resend test endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
