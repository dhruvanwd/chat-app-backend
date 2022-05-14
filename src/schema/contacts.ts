import { Schema, model } from "mongoose";
import { IContact } from "../types";

const contactSchema = new Schema<IContact>({
  initiatorId: { type: String, required: true },
  receiverId: { type: String, required: true },
  receiverChannelName: { type: String, required: true },
});

// 3. Create a Model.
export const Contact = model<IContact>("contact", contactSchema);
