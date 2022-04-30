import { Schema, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
  },
  mobile: {
    type: String,
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    },
  },
  password: { type: String, required: true },
  avatar: {
    type: String,
  },
});

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
