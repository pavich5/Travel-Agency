import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API ?? "",
  process.env.MAILJET_SECRET_KEY ?? "",
  {
    config: {},
    options: {},
  }
);

export const sendEmail = async (
  toEmail: string,
  subject: string,
  text: string,
  userName: string,
  offerId: string
) => {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 10px 0;
                background-color: #007BFF;
                color: #ffffff;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                padding: 10px;
                background-color: #f4f4f4;
                color: #777777;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            h3 {
                color: #333333;
            }
            p {
                color: #777777;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #000000; /* Button text color set to black */
                background-color: #007BFF;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Payment Confirmation</h1>
            </div>
            <div class="content">
                <h3>Dear ${userName},</h3>
                <p>Thank you for your payment. We have received your payment successfully.</p>
                <p>${text}</p>
                <a href="https://travel-agency-plum.vercel.app/offer/${offerId}" class="button">Visit your booking</a>
            </div>
            <div class="footer">
                <p>Thank you for choosing Globetrotter. If you have any questions, feel free to contact us.</p>
                <p>&copy; ${new Date().getFullYear()} Globetrotter. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "pavic.antonio969@gmail.com",
            Name: "Globetrotter",
          },
          To: [
            {
              Email: toEmail,
              Name: userName,
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: htmlContent,
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
