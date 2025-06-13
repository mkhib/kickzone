export const getPasswordSetupEmailTemplate = (setupLink: string) => ({
  subject: 'Welcome to Kickzone - Set Up Your Password',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Kickzone!</h2>
      <p>Thank you for joining Kickzone as a seller. To get started, you'll need to set up your password.</p>
      <p>Click the button below to set up your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${setupLink}" 
           style="background-color: #4CAF50; 
                  color: white; 
                  padding: 12px 24px; 
                  text-decoration: none; 
                  border-radius: 4px;
                  display: inline-block;">
          Set Up Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        This link is valid for 24 hours and can only be used once. If you didn't request this email, please ignore it.
      </p>
    </div>
  `,
});
