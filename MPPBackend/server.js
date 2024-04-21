import { faker } from "@faker-js/faker";
import http from "http";
import mongoose from "mongoose";

import { Server } from "socket.io";
import app from "./app.js";
import { UserS } from "./models/UserSchema.js";

const server = http.createServer(app);
const io = new Server(server);

const teamsNBA = [
  "LA Lakers",
  "Golden State Warriors",
  "Bulls",
  "Bucks",
  "Grizzlies",
  "OKC",
  "The Suns",
  "The Mavericks",
  "Boston Celtics",
  "The Clippers",
  "The Raptors",
  "Miami Heat",
  "Cleaveland Cavaliers",
];

const createUser = async () => {
  let id = -1;
  const uzers = await UserS.find().sort({ id: 1 });
  for (let i = 0; i < uzers.length; i++) {
    if (uzers[i].id != i + 1) {
      id = i + 1;
      break;
    }
  }
  if (id == -1) {
    id = uzers.length + 1;
  }
  const name = faker.person.firstName("male");

  const team = teamsNBA[Math.ceil(Math.random() * (teamsNBA.length - 1))];
  const age = Math.ceil(Math.random() * 51 + 47);
  const pictureUrl = "nacho.jpeg";

  return await UserS.create({ id, name, team, pictureUrl, age });
};

io.on("connection", (socket) => {
  setInterval(() => {
    const user = createUser();
    socket.emit("newUser", user);
  }, 10000);
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
