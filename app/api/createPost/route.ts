import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/app/api/lib/db';
import PostModel from '../models/PostModel';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { title, description, author, images } = await req.json();
    if(!{title, description, author, images}) return
    const newPost = await PostModel.create({
      title,
      description,
      author,
      images,
    });

    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse('Error creating post', { status: 500 });
  }
}
