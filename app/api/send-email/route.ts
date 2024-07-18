import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../sendEmail";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
        const { toEmail, subject, text, userName,offerId } = await req.json();
        const result = await sendEmail(toEmail, subject, text,userName,offerId);
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
      console.error("Error handling webhook:", error);
      return new NextResponse();
    }   
  } else {
    return new NextResponse();
  }
}
