import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";

export async function PATCH(req: NextRequest) {
  try {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://travel-agency-mauve-zeta.vercel.app');
    headers.append('Content-Type', 'application/json');
    await dbConnect();

    const { _id, comments } = await req.json();

    if (!_id) {
      return new NextResponse("Missing _id in request body", { status: 400 });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      _id,
      { comments },
      { new: true }
    );

    if (!updatedPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return new NextResponse("Error updating post", { status: 500 });
  }
}
