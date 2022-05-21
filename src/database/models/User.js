/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    friends: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    enemies: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    toObject: {
      transform: (null, returnObject) => {
        returnObject.id = returnObject._id;
        delete returnObject.__v;
        delete returnObject._id;
      },
    },
  }
);

const User = model("User", UserSchema, "users");

module.exports = User;
