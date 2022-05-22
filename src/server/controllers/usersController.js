const bcrypt = require("bcrypt");
const debug = require("debug")("trapperz:server:controllers");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const encryptPassword = (password) => bcrypt.hash(password, 10);

const registerUser = async (req, res, next) => {
  const name = req.body.name.toString();
  const username = req.body.username.toString();
  const password = req.body.password.toString();
  const user = await User.findOne({ username });
  if (user) {
    const error = new Error();
    error.code = 409;
    error.message = "Username already exists";
    next(error);
    return;
  }

  const encryptedPassword = await encryptPassword(password);

  try {
    const newUser = await User.create({
      name,
      username,
      password: encryptedPassword,
      image: "https://cdn.sanjosedemaipo.cl/home/images/no-user-image-icon.jpg",
      friends: [],
      enemies: [],
    });

    res
      .status(201)
      .json({ user: { username: newUser.username, id: newUser.id } });
    debug("User created successfully!");
  } catch (error) {
    error.code = 400;
    error.customMessage = "Wrong user data";
    next(error);
  }
};

const loginUser = async (req, res) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({ msg: "User not found" });
    return;
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    res.status(401).json({ msg: "Incorrect username and/or password" });
    return;
  }

  const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  debug(`${users.length} users were retrieved`);
  res.status(200).json(users);
};

module.exports = { registerUser, loginUser, getUsers };
