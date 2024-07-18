const mailjet = require('node-mailjet').connect(process.env.MAILJET_API, process.env.MAILJET_SECRET_KEY);

export const sendEmail = async (toEmail:string, subject:string, text:string) => {
  try {
    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'pavic.antonio969@gmail.com',
              Name: 'Antonio Pavic',
            },
            To: [
              {
                Email: toEmail,
                Name: 'Recipient Name',
              },
            ],
            Subject: subject,
            TextPart: text,
          },
        ],
      });

    const result = await request;
    return result.body;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
