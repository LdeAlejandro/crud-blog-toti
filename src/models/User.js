import mongoose from "mongoose";

//Alejandro

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
    verificationToken: {
      type: String,
      unique: false,
      required: false,
    },
    verifiedAccount: {
      type: Boolean,
      unique: false,
      required: false,
      default: false,
    },
    IsAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
