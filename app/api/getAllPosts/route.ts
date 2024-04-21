import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await PostModel.find();

    const response = new NextResponse(JSON.stringify(posts));
    return response;
  } catch (error) {
    console.error("Error creating post:", error);
        const errorResponse = new NextResponse("Error", { status: 500 });
    return errorResponse;
  }
}
