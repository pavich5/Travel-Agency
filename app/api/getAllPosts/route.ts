import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await PostModel.find();
    return new NextResponse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error creating post:", error);
    
    return new NextResponse("Error", { status: 500 });
  }
}
