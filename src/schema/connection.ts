import { Schema, model } from "mongoose";
import { IConnection } from "../types";

const connectionSchema = new Schema<IConnection>({
  // participants will be an array of user ids
  participants: {
    type: [String, String],
    required: true,
  },
  connectionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
});

// 3. Create a Model.
export const Connection = model<IConnection>("connection", connectionSchema);
