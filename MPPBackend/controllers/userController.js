import { User } from "../models/User.js";

import { users } from "../dataStorage.js";

//import mongoose from 'mongoose'

export const getUsers = (req, res) => {
  res.json(users);
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.getId() == id);
  if (user) res.status(200).json(user);
  else res.status(404).json("User not found");
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, team, pictureUrl, age } = req.body;

    const user = new User(name, team, pictureUrl, age);
    users.push(user);
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.getId() == id);
  if (index > -1) {
    users.splice(index, 1);
    res.status(200).json("User deleted");
  } else {
    res.status(400).json("User mot found");
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.getId() == id);

  try {
    const { name, team, pictureUrl, age } = req.body;
    user.setName(name);
    user.setTeam(team);
    user.setPictureUrl(pictureUrl);
    user.setAge(age);
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json("user not found");
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
};
