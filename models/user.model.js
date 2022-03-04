const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  publicAddress: { unique: true, type: String, required: true },
  nonce: { unique: true, type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

userSchema.pre("find", function (next) {
  this.select("-__v");
  next();
});

userSchema.pre("findOne", function (next) {
  this.select("-__v");
  next();
});

module.exports = User = mongoose.model("User", userSchema);
