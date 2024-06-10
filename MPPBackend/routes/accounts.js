import express from "express";

import {
  deleteAccountByUsername,
  getAccountByUsername,
  loginAccount,
  registerAccount,
} from "../controllers/accountController.js";

const router = express.Router();

//GET one by Id
router.get("/:username", getAccountByUsername);

//POST a new one
router.post("/registerAccount", registerAccount);

//DELETE one
router.delete("/:username", deleteAccountByUsername);

//Login
//router.get("/login", loginAccount);
router.post("/login", loginAccount);
//http://localhost:4000/api/accounts / ...

export default router;
