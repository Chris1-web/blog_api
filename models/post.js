const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 100 },
  description: { type: String, minLength: 3, maxLength: 100 },
  date: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  published: { type: Boolean, required: true, default: true },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
