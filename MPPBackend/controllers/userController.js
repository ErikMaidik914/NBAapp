import { UserS } from "../models/UserSchema.js";

export const getUsers = async (req, res) => {
  const allUsers = await UserS.find().sort({ id: 1 });
  res.status(200).json(allUsers);
};

const getFirstFreeId = async () => {
  let myId = -1;
  const uzers = await UserS.find().sort({ id: 1 });
  for (let i = 0; i < uzers.length; i++) {
    if (uzers[i].id != i + 1) {
      myId = i + 1;
      break;
    }
  }
  if (myId == -1) {
    myId = uzers.length + 1;
  }
  return myId;
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserS.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, team, pictureUrl, age } = req.body;
    const id = await getFirstFreeId();
    const savedUser = await UserS.create({ id, name, team, pictureUrl, age });

    return res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message } + "andron");
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  UserS.deleteOne({ id: id }, (err) => {
    if (err) {
      res.status(500).json({ message: "Error deleting user" });
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  });
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const user = UserS.findOne((user) => user.getId() == id);

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
