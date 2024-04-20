import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    await dbConnect();
    const postId = req.url.split('?')[1].split('=')[1]
    if(!postId) return
    const posts = await PostModel.findById(postId);
    return new NextResponse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
