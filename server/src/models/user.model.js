const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// In user.model.js

userSchema.statics.signup = async function (firstname, lastname, email, password) {
  // Add validation for firstname
  if (!firstname || !email || !password) {
    throw Error(`First name, email, and password are required`);
  }

  if (!validator.isEmail(email)) {
    throw Error(`Email is not valid`);
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(`Password is not strong enough`);
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error(`Email is already in use`);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the user with all the fields
  const user = await this.create({ firstname, lastname, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error("Email and password Required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("USER", userSchema);
