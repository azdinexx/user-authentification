const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema(
  {
    profile: { type: String },
    bio: { type: String },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', user);
