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
  const { id } = req.params;
  // const data = getUserById(id);
  // if (data.status == 404) {
  //   return res.status(404).json({ error: "User not found" });
  // }

  const user = await UserS.findOneAndDelete({ id: id });

  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  const user = await UserS.findOneAndUpdate({ id: id }, { ...req.body });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
};
