import { NextResponse } from "next/server";
import { dbConnect } from "@/app/api/lib/db";
export async function GET() {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', 'https://travel-agency-plum.vercel.app');
  headers.append('Content-Type', 'application/json');
  const con = await dbConnect();
  console.log("hit db connect",con);
  return new NextResponse("connected and disconnected");
}
