const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API,
  process.env.MAILJET_SECRET_KEY,
  {
    config: {},
    options: {}
  }
);

export const sendEmail = async (toEmail:string, subject:string, text:string) => {
  try {
    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'pavic.antonio969@gmail.com', // Your email address
              Name: 'Antonio Pavic',
            },
            To: [
              {
                Email: toEmail,
                Name: 'Recipient Name', // Adjust if you have the recipient's name
              },
            ],
            Subject: subject,
            TextPart: text,
            HTMLPart: `<h3>${text}</h3>`, // Use text for the HTML part too or customize
          },
        ],
      });

    const result = await request;
    console.log(result.body);
    return result.body;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
