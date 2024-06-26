import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const postId = req.url.split('?')[1]?.split('=')[1];

    if (!postId) return

    const query = { _id: postId };

    const deletedPost = await PostModel.findOneAndDelete(query);

    if (!deletedPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(deletedPost));
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
