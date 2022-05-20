/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
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
  },
  enemies: {
    type: [Schema.Types.ObjectId],
  },
});

UserSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
