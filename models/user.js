const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 100 },
  password: { type: String, required: true, minLength: 3, maxLength: 100 },
  blog: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
});

UserSchema.plugin(mongoosePaginate);

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
