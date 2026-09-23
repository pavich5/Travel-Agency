import Mailjet from "node-mailjet";
export async function sendEmail(
  toEmail: string,
  subject: string,
  text: string,
  userName: string,
  offerId: string,
) {
  if (
    !process.env.MAILJET_API ||
    !process.env.MAILJET_SECRET_KEY ||
    !process.env.MAIL_FROM_EMAIL
  )
    throw new Error("Email is not configured.");
  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API,
    process.env.MAILJET_SECRET_KEY,
  );
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const result = await mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.MAIL_FROM_EMAIL,
            Name: process.env.MAIL_FROM_NAME || "Globetrotter",
          },
          To: [{ Email: toEmail, Name: userName }],
          Subject: subject,
          TextPart: `Hello ${userName},\n\n${text}\n\nReview your trip: ${appUrl}/offer/${encodeURIComponent(offerId)}\nYour bookings: ${appUrl}/trips\n\nThank you for choosing Globetrotter.`,
        },
      ],
    });
  return result.body;
}
