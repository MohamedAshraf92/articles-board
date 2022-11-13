const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const CustomError = require("./customError.js");

const isUserExist = async (email) => {
  const registeredEmail = await User.exists({ email });
  if (registeredEmail) {
    const error = new CustomError(
      400,
      "REGISTERATION_ERROR",
      "E-Mail address already exists!"
    );
    throw error;
  }
};

const authinticateUser = async (email, password) => {
  const user = await User.findOne({ email: email }).populate("articles");
  if (!user) {
    const error = new CustomError(
      401,
      "Unauthorized",
      "Invalid email or password!"
    );
    throw error;
  }
  const isCorrectPW = await bcrypt.compare(password, user.password);
  if (!isCorrectPW) {
    const error = new CustomError(
      401,
      "Unauthorized",
      "Invalid email or password!"
    );
    throw error;
  }
  return user;
};

const generateJWT = (email, userId) => {
  const token = jwt.sign(
    {
      email,
      userId: userId.toString(),
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  return token;
};

module.exports = {
  isUserExist,
  authinticateUser,
  generateJWT,
};
