import mongoose from "mongoose";

// Aleksandr
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model("Post", postSchema)

