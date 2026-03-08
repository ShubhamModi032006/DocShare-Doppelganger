# Email Service Debugging Guide - Resend API

## 🚨 Production Email Issues - Resend API Setup

### 1. Environment Variables Verification
```bash
# Check if environment variables are set correctly
echo "RESEND_API_KEY: $RESEND_API_KEY"
echo "RESEND_FROM_EMAIL: $RESEND_FROM_EMAIL"
echo "NODE_ENV: $NODE_ENV"
```

### 2. Resend API Setup
**CRITICAL**: Use Resend API, NOT Gmail SMTP

1. **Create Resend Account**:
   - Go to: https://resend.com
   - Sign up for free account

2. **Get API Key**:
   - Go to: https://resend.com/api-keys
   - Create new API key
   - Copy the API key (starts with `re_`)

3. **Verify Domain (Optional but recommended)**:
   - Add your domain in Resend dashboard
   - Add DNS records provided by Resend
   - This allows you to send from your own domain

4. **Test API Key**:
   ```javascript
   // Test script
   const { Resend } = require('resend');
   const resend = new Resend('your_api_key_here');
   
   resend.emails.send({
     from: 'onboarding@resend.dev',
     to: 'your-email@example.com',
     subject: 'Test',
     text: 'Test email'
   }).then(console.log).catch(console.error);
   ```

### 3. Common Resend Issues & Solutions

#### Issue 1: "Invalid API key"
- **Cause**: Wrong or expired API key
- **Fix**: Generate new API key from Resend dashboard

#### Issue 2: "Domain not verified"
- **Cause**: Using custom domain without verification
- **Fix**: Either verify domain or use `onboarding@resend.dev`

#### Issue 3: "Rate limit exceeded"
- **Cause**: Too many emails sent in short time
- **Fix**: Implement rate limiting or upgrade plan

#### Issue 4: "Email rejected"
- **Cause**: Invalid recipient email or spam content
- **Fix**: Verify email addresses and check content policies

### 4. Production Environment Checks

#### API Key Test:
```bash
# Test Resend API connection
curl -X GET https://your-production-url/debug/test-resend
```

#### Email Configuration:
```bash
# Check email configuration
curl -X GET https://your-production-url/debug/email-config
```

#### Send Test Email:
```bash
# Send test email
curl -X POST https://your-production-url/debug/test-email \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "your-email@example.com"}'
```

### 5. Resend vs Gmail SMTP - Benefits

#### Resend Advantages:
- ✅ **Production-ready**: Built for production use
- ✅ **No App Passwords**: Simple API key authentication
- ✅ **Better Deliverability**: Professional email infrastructure
- ✅ **Analytics**: Track email opens and clicks
- ✅ **No SMTP Issues**: No firewall/port problems
- ✅ **Scalable**: Handle high volume easily

#### Gmail SMTP Issues:
- ❌ **App Password complexity**: 16-character passwords
- ❌ **Security restrictions**: Google blocking
- ❌ **Port blocking**: Firewall issues in production
- ❌ **Rate limiting**: Strict sending limits
- ❌ **Not production-ready**: Designed for personal use

### 6. Monitoring & Alerting

#### Email Service Health Check:
```javascript
// Built into the new debug endpoints
const checkEmailService = async () => {
  try {
    await testResendConnection();
    console.log('✅ Resend API service healthy');
  } catch (error) {
    console.error('❌ Resend API service down:', error);
    // Send alert to monitoring system
  }
};
```

#### Log Analysis:
- Monitor Resend API response codes
- Track success/failure rates
- Set up alerts for high failure rates
- Monitor API key usage

### 7. Quick Production Fix Script

The debug endpoints are already set up for testing:
```javascript
// POST /debug/test-email - Test email sending
// GET /debug/email-config - Check configuration
// GET /debug/test-resend - Test API connection
```

### 8. Security Best Practices

1. **Never commit API keys to git**
2. **Use environment-specific .env files**
3. **Rotate API keys regularly**
4. **Monitor API key usage**
5. **Implement rate limiting for email sending**
6. **Use domain verification for production**

### 9. Troubleshooting Checklist

- [ ] Resend account created and verified
- [ ] API key generated and configured
- [ ] Domain verified (if using custom domain)
- [ ] Environment variables set correctly
- [ ] API connection working
- [ ] Test emails sending successfully
- [ ] Monitoring system in place
- [ ] Rate limiting implemented

### 10. Migration Complete

Your application has been successfully migrated from Gmail SMTP to Resend API:

- ✅ **mailer.js**: Replaced with Resend client
- ✅ **authController.js**: Updated to use Resend
- ✅ **debugRoutes.js**: New Resend testing endpoints
- ✅ **Environment variables**: Updated for Resend
- ✅ **Console fallback**: Still shows OTP for debugging

The email service is now production-ready and much more reliable!
