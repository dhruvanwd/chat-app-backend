import { Schema, model } from "mongoose";
import { IConnection } from "../types";

const connectionSchema = new Schema<IConnection>({
  // participants will be an array of user ids
  groupName: {
    type: String,
    required: false,
  },
  participants: {
    type: [String, String],
    required: true,
  },
  connectionId: { type: String, required: true },
  connectionType: {
    type: String,
    enum: ["one-to-one", "one-to-many", "many-to-many"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  groupAvatar: { type: String, required: false },
});

// 3. Create a Model.
export const Connection = model<IConnection>("connection", connectionSchema);
