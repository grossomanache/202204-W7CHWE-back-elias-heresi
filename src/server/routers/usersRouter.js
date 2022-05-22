const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/usersController");
const { auth } = require("../middlewares/auth");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/list", auth, getUsers);

module.exports = { usersRouter };
