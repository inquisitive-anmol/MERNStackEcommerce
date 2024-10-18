const nodemailer = require("nodemailer");
const { google } = require("googleapis");


const sendEmail = async (options) => {
    
    const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
  });

  const accessToken = oauth2Client.getAccessToken();
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL, // Your Gmail address
      clientId: process.env.CLIENT_ID, // Google Client ID
      clientSecret: process.env.CLIENT_SECRET, // Google Client Secret
      refreshToken: process.env.REFRESH_TOKEN, // OAuth2 Refresh Token
      accessToken: process.env.OUATH_ACCESS_TOKEN // Access token generated
    }
  });

  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: options.email, // Recipient email address
    subject: options.subject, // Subject
    text: options.message, // Plain text message
    // html: '<h1>Order Confirmation</h1><p>Your order has been successfully placed.</p>',
  }

const result = await transporter.sendMail(mailOptions);

};




module.exports = sendEmail;