import cors from "cors";
import express from "express";
import fanRouter from "./routes/fans.js";
import userRouter from "./routes/users.js";
//require("dotenv").config();
//const express = require("express");

//app
export const app = express();
//const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/users", userRouter);

app.use("/api/fans", fanRouter);

//module.exports = app;
export default app;
