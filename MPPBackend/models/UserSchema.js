import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
});

export const UserS = mongoose.model("UserSchema", UserSchema);
