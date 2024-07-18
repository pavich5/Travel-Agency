const mailjet = require('node-mailjet').connect(process.env.MAILJET_API, process.env.MAILJET_SECRET_KEY);

export const sendEmail = (toEmail:string, subject:string, text:string) => {
  return mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'pavic.antonio969@gmail.com  ',
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
};

