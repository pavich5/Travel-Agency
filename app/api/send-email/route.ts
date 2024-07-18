import { NextApiRequest, NextApiResponse } from "next";
import nextCors from "nextjs-cors";
import { sendEmail } from "../sendEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS
  await nextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if (req.method === "POST") {
    try {
      const { toEmail, subject, text, userName, offerId } = req.body;
      const result = await sendEmail(toEmail, subject, text, userName, offerId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
