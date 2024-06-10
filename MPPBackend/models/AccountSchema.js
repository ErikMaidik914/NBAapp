import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AccountS = mongoose.model("AccountSchema", AccountSchema);
