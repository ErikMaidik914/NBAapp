import { AccountS } from "../models/AccountSchema.js";

const getFirstFreeId = async () => {
  let myId = -1;
  const accounts = await AccountS.find().sort({ id: 1 });
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id != i + 1) {
      myId = i + 1;
      break;
    }
  }
  if (myId == -1) {
    myId = accounts.length + 1;
  }
  return myId;
};

export const getAccountByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const account = await AccountS.findOne({ username: username });
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const accountId = await getFirstFreeId();
    const savedAccount = await AccountS.create({
      accountId,
      username,
      password,
    });
    res.status(200).json(savedAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccountByUsername = async (req, res) => {
  const { username } = req.params;

  const account = await AccountS.findOneAndDelete({ username: username });

  if (!account) {
    return res.status(404).json({ error: "account not found" });
  }

  res.status(200).json(account);
};

export const loginAccount = async (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body);
  try {
    const account = await AccountS.findOne({
      username: username,
      password: password,
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    console.log(account);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAccountByUsername,
  registerAccount,
  deleteAccountByUsername,
  loginAccount,
};
