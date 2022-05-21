const bcrypt = require("bcrypt");
const debug = require("debug")("trapperz:server:controllers");
const User = require("../../database/models/User");

const encryptPassword = (password) => bcrypt.hash(password, 10);

const registerUser = async (req, res, next) => {
  const { username, name, password } = req.body;
  const user = User.findOne({ username: username.toString() });
  if (user) {
    const error = new Error();
    error.code = 409;
    error.customMessage = "Username already exists";
    next(error);
  }
  const encryptedPassword = await encryptPassword(password);

  try {
    const newUser = await User.create({
      name,
      username,
      password: encryptedPassword,
    });
    debug(newUser);

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

module.exports = { registerUser };
