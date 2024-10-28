import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  placeId: { type: Number, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
