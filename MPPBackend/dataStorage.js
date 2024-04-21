import { faker } from "@faker-js/faker";
import { User } from "./models/User.js";

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

export function createUser() {
  const id = Math.ceil(Math.random() * 100000);
  const name = faker.person.firstName("male");

  const team = teamsNBA[Math.ceil(Math.random() * (teamsNBA.length - 1))];
  const age = Math.ceil(Math.random() * 51 + 47);
  const pictureUrl = "nacho.jpeg";

  return new User(name, team, pictureUrl, age);
}

export const users = Array.from({ length: 20 }, () => {
  const newUser = createUser();
  return newUser;
});

export default {
  users,
  createUser,
};
