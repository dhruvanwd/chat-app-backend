import { Schema, model } from "mongoose";
import { IConnection } from "../types";

const connectionSchema = new Schema<IConnection>({
  initiatorId: { type: String, required: true },
  receiverId: { type: String, required: true },
  receiverChannelName: { type: String, required: true },
});

// 3. Create a Model.
export const Connection = model<IConnection>("connection", connectionSchema);
