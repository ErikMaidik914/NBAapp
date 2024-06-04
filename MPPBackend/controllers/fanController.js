import { FanS } from "../models/FanSchema.js";

export const getFans = async (req, res) => {
  const allFans = await FanS.find().sort({ id: 1 });
  res.status(200).json(allFans);
};

const getFirstFreeId = async () => {
  let myId = -1;
  const fanz = await FanS.find().sort({ id: 1 });
  for (let i = 0; i < fanz.length; i++) {
    if (fanz[i].id != i + 1) {
      myId = i + 1;
      break;
    }
  }
  if (myId == -1) {
    myId = fanz.length + 1;
  }
  return myId;
};

export const getFansById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const fan = await FanS.findOne({ id: id });

    if (!fan) {
      return res.status(404).json({ message: "Fan not found" });
    }

    return res.status(200).json(fan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFans = async (req, res) => {
  try {
    const { name, pictureUrl } = req.body;
    const id = await getFirstFreeId();
    const savedFan = await FanS.create({ id, userId, name, pictureUrl });

    return res.status(200).json(savedFan);
  } catch (error) {
    res.status(400).json({ error: error.message } + "andron");
  }
};

export const deleteFans = async (req, res) => {
  const { id } = req.params;
  // const data = getUserById(id);
  // if (data.status == 404) {
  //   return res.status(404).json({ error: "User not found" });
  // }

  const fan = await FanS.findOneAndDeletes({ id: id });

  if (!fan) {
    return res.status(404).json({ error: "fan not found" });
  }

  res.status(200).json(fan);
};

export const updateFans = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  const fan = await FanS.findOneAndUpdate({ id: id }, { ...req.body });

  if (!fan) {
    return res.status(404).json({ error: "Fan not found" });
  }

  res.status(200).json(user);
};

export default {
  createFans,
  updateFans,
  deleteFans,
  getFans,
  getFansById,
};
