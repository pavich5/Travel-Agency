import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/app/api/lib/db';
import PostModel from '../models/PostModel';

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const { _id, likes } = await req.json();

    if (!_id) {
      return new NextResponse('Missing _id in request body', { status: 400 });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      _id,
      { likes },
      { new: true }
    );

    if (!updatedPost) {
      return new NextResponse('Post not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return new NextResponse('Error updating post', { status: 500 });
  }
}
