import { NextResponse } from "next/server";
import { dbConnect } from "@/app/api/lib/db";
export async function GET() {
  const con = await dbConnect();
  console.log("hit db connect",con);
  return new NextResponse("connected and disconnected");
}
