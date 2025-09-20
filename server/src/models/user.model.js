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
  // ✨ NEW: Added username field
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
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

// ✨ UPDATED: The signup static method now handles the username
userSchema.statics.signup = async function (firstname, lastname, username, email, password) {
  // Add validation for all required fields
  if (!firstname || !username || !email || !password) {
    throw Error(`First name, username, email, and password are all required`);
  }
  if (!validator.isEmail(email)) {
    throw Error(`Email is not valid`);
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(`Password is not strong enough`);
  }

  // Check for existing email OR username
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error(`Email is already in use`);
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error(`Username is already taken`);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create the user with all the fields
  const user = await this.create({ firstname, lastname, username, email, password: hash });

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