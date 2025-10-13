function otpHtmlTemplate({ otp = "", expiresInMinutes = "", appName = "" }) {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${appName} Verification Code</title>
    <style>
      /* Keep styles simple & inline-friendly for most clients */
      .container { max-width: 520px; margin: 0 auto; padding: 24px; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
      .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }
      .h1 { font-size: 20px; font-weight: 700; margin: 0 0 12px; }
      .muted { color: #6b7280; font-size: 14px; margin: 12px 0 0; }
      .otp { letter-spacing: 4px; font-weight: 700; font-size: 28px; padding: 12px 16px; display: inline-block; border: 1px dashed #d1d5db; border-radius: 8px; }
      .footer { color: #9ca3af; font-size: 12px; margin-top: 24px; }
      @media (prefers-color-scheme: dark) {
        .card { border-color: #374151; }
        .muted { color: #9ca3af; }
        .footer { color: #9ca3af; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Preheader (hidden in most clients) -->
      <div style="display:none;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
        Your ${appName} verification code is ${otp}. It expires in ${expiresInMinutes} minutes.
      </div>

      <div class="card">
        <div class="h1">${appName} verification code</div>
        <p>Use the code below to verify your email address. For your security, don’t share this code with anyone.</p>
        <p class="otp">${otp}</p>
        <p class="muted">This code will expire in ${expiresInMinutes} minutes.</p>
      </div>

      <p class="footer">
        If you didn’t request this, you can ignore this email.
      </p>
    </div>
  </body>
</html>
`;
}

module.exports = { otpHtmlTemplate };
