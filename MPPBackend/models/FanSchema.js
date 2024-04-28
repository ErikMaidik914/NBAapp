import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FanSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
  },
});

export const FanS = mongoose.model("FanSchema", FanSchema);
