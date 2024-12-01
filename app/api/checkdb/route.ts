import { dbConnect } from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    await dbConnect();
    return new NextResponse("test");
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
