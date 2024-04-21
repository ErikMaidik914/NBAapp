import cors from "cors";
import express from "express";
import router from "./routes/users.js";
//require("dotenv").config();
//const express = require("express");

//app
export const app = express();
//const userRoutes = require("./routes/users");

//middleware - logs requests
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/users", router);

//module.exports = app;
export default app;
