import { User } from "../models/User.js";

//import mongoose from 'mongoose'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.findOne({ id: id });
    if (user) res.status(200).json(user);
    else res.status(404).json("User not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, team, url, age } = req.body;

    const user = new User({ name, team, url, age });
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await User.findOneAndDelete({ id: id });
    if (user) res.status(200).json("User deleted");
    else res.status(404).json("User not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { name, team, url, age } = req.body;
    const user = await User.findOneAndUpdate(
      { id: id },
      { name, team, url, age },
      { new: true }
    );
    if (user) res.status(200).json(user);
    else res.status(404).json("User not found");
  } catch (error) {
    res.status(400).json("User not found");
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
};
