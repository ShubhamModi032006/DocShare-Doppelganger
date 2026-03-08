# Resend API Setup Instructions

## 🚀 Quick Setup Guide

### 1. Get Resend API Key
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
4. Click "Create API Key"
5. Copy the API key (starts with `re_`)

### 2. Set Environment Variables

Create or update your `.env` file:

```bash
# Required: Resend API Key
RESEND_API_KEY=re_your_api_key_here

# Optional: Custom from email (must be verified in Resend)
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Optional: Test email for debugging
RESEND_TEST_EMAIL=your-email@example.com
```

### 3. Test the Setup

Run the test script:

```bash
cd Docshare-Backend
node test-resend.js
```

### 4. Available Debug Endpoints

Once deployed, you can test using these endpoints:

```bash
# Check email configuration
GET /debug/email-config

# Test Resend API connection
GET /debug/test-resend

# Send test email
POST /debug/test-email
{
  "testEmail": "your-email@example.com"
}
```

### 5. Benefits of Resend vs Gmail SMTP

✅ **Production Ready**: Built for production use
✅ **No App Passwords**: Simple API key authentication
✅ **Better Deliverability**: Professional email infrastructure
✅ **No Firewall Issues**: Uses HTTPS, not SMTP ports
✅ **Analytics**: Track email opens and clicks
✅ **Scalable**: Handle high volume easily

### 6. Migration Complete

Your application has been fully migrated from nodemailer/Gmail SMTP to Resend API:

- ✅ `mailer.js` - Replaced with Resend client
- ✅ `authController.js` - Updated to use Resend
- ✅ `debugRoutes.js` - New Resend testing endpoints
- ✅ `package.json` - Removed nodemailer, added resend
- ✅ Environment variables - Updated for Resend
- ✅ Console fallback - Still shows OTP for debugging

The email service is now production-ready and much more reliable!
