import express from "express";

import {
  createFans,
  deleteFans,
  getFans,
  getFansById,
  updateFans,
} from "../controllers/fanController.js";

const router = express.Router();

//GET all
router.get("/", getFans);

//GET one by Id
router.get("/:id", getFansById);

//POST a new one
router.post("/addFan", createFans);

//DELETE one
router.delete("/:id", deleteFans);

//UPDATE one
router.put("/:id", updateFans);

export default router;
