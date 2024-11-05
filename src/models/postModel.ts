import { Schema, Document, model } from "mongoose";

export interface Post extends Document {
  description: string;
  name: string;
  photo: string;
  preference: Schema.Types.ObjectId[];
  block: Schema.Types.ObjectId[];
  like: Schema.Types.ObjectId[];
  dislike: Schema.Types.ObjectId[];
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<Post>(
  {
    description: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    preference: [{ type: Schema.Types.ObjectId, ref: "Preferences", required: true }],
    block: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    like: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    dislike: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true } // Enable timestamps
);

export default model<Post>("Posts", PostSchema);
