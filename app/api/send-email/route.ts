import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../sendEmail";

export async function POST(req: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method === "POST") {
    try {
      const { toEmail, subject, text, userName, offerId } = await req.json();
      const result = await sendEmail(toEmail, subject, text, userName, offerId);

      return new NextResponse(JSON.stringify(result), {
        status: 200,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error("Error handling request:", error);

      return new NextResponse(null, {
        status: 500,
        headers: corsHeaders,
      });
    }
  } else {
    return new NextResponse(null, {
      status: 405,
      headers: corsHeaders,
    });
  }
}
