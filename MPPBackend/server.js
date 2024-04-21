import http from "http";
import mongoose from "mongoose";

import { Server } from "socket.io";
import app from "./app.js";
import { createUser, users } from "./dataStorage.js";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  setInterval(() => {
    const user = createUser();
    users.push(user);
    socket.emit("newUser", user);
  }, 5000);
});

const PORT = process.env.PORT || 4000;

//db conn
mongoose
  .connect("mongodb+srv://erikmaidik:pulpitedepui1@nbaapp.tcuji3p.mongodb.net/")
  .then(() => {
    //nodemon server.js
    server.listen(PORT, () => {
      console.log(`listening on port & connected to db ${PORT} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
