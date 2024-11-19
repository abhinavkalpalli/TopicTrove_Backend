import { Schema, Document, model } from "mongoose";

export interface Preference extends Document {
  name: string;
  userId: Schema.Types.ObjectId;
}

const PreferenceSchema = new Schema<Preference>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

export default model<Preference>("Preferences", PreferenceSchema);
