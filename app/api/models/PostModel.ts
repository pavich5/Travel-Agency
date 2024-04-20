import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  userName: string;
  userId: string;
  userImage: string;
  content: string;
}

export interface IPost extends Document {
  title: string;
  description: string;
  author: {
    userName: { type: String; required: false; unique: false };
    userId: { type: String; required: false; unique: false };
    userImage: { type: String; required: false; unique: false };
  };
  likes?: number;
  comments?: IComment[];
  images?: string[];
}

const postSchema: Schema<IPost> = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: {
    type: {
      userName: { type: String, required: false, unique: false },
      userId: { type: String, required: false, unique: false },
      userImage: { type: String, required: false, unique: false },
    },

    required: true,
  },
  likes: { type: Number, required: false, default: 0 },
  comments: {
    type: [
      {
        userName: { type: String, required: false, unique: false },
        userId: { type: String, required: false, unique: false },
        userImage: { type: String, required: false, unique: false },
        content: { type: String, required: false, unique: false },
      },
    ],
    required: false,
  },
  images: [{ type: String, required: false }],
});

let PostModel: Model<IPost>;

try {
  PostModel = mongoose.model<IPost>("Post");
} catch (error) {
  PostModel = mongoose.model<IPost>("Post", postSchema);
}

export default PostModel;
