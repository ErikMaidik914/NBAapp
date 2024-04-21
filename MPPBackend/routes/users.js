import express from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//GET all
router.get("/", getUsers);

//GET one by Id
router.get("/:id", getUserById);

//POST a new one
router.post("/addUser", createUser);

//DELETE one
router.delete("/:id", deleteUser);

//UPDATE one
router.put("/:id", updateUser);

export default router;
