import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://travel-agency-mauve-zeta.vercel.app');
    headers.append('Content-Type', 'application/json');
    await dbConnect();
    const posts = await PostModel.find();
    return new NextResponse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error creating post:", error);
    
    return new NextResponse("Error", { status: 500 });
  }
}
