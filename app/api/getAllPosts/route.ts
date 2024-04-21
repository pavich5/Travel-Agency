import { dbConnect } from "@/app/api/lib/db";
import PostModel from "../models/PostModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const posts = await PostModel.find();

    const response = new NextResponse(JSON.stringify(posts));

    response.headers.append('Cache-Control', 'no-store');

    response.headers.append('Access-Control-Allow-Origin', 'https://travel-agency-plum.vercel.app');
    response.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
    response.headers.append('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    response.headers.append('Access-Control-Allow-Credentials', 'true');

    return response;
  } catch (error) {
    console.error("Error creating post:", error);
    
    // Create a new response object for error with CORS headers and no caching
    const errorResponse = new NextResponse("Error", { status: 500 });
    errorResponse.headers.append('Cache-Control', 'no-store'); // or 'no-cache'
    errorResponse.headers.append('Access-Control-Allow-Origin', 'https://travel-agency-plum.vercel.app');
    errorResponse.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
    errorResponse.headers.append('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    errorResponse.headers.append('Access-Control-Allow-Credentials', 'true');

    return errorResponse;
  }
}
