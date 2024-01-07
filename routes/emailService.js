const nodemailer = require('nodemailer');

// Email configuration using Gmail SMTP
let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'herwaysite@gmail.com', // Your Gmail address
    pass: 'vtvm tevs focd jqir', // Generate an App Password for nodemailer
  },
});

const sendEmailNotification = async (recipientEmail, newPostDetails) => {
  try {
    // Define the email content
    const mailOptions = {
      from: 'herwaysite@gmail.com', // Sender's email address
      to: recipientEmail, // Recipient email address
      subject: 'New Post Notification',
      html: `
        <p>Hello,</p>
        <p>A new post matching your demand details is available:</p>
        <p>Source: ${newPostDetails.source.city}</p>
        <p>Destination: ${newPostDetails.destination.city}</p>
        <p>Feel free to check it out!</p>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmailNotification };
