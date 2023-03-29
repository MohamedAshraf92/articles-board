const { ApolloError, AuthenticationError } = require("apollo-server-express");
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
  const user = await User.findOne({ email: email }).populate({
    path: "articles",
    populate: { path: "category" },
  });
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

const getCurrentUser = async (authHeader) => {
  if (!authHeader)
    throw new ApolloError("There is no auth header!", "Unauthorized");
  const token = authHeader.split(" ")[1];
  if (!token) throw new ApolloError("User must provide token", "Unauthorized");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) throw new ApolloError("Invalid Token!", "Unauthorized");
  const currentUser = await User.findById(decodedToken.userId);
  if (!currentUser) throw new ApolloError("User is not found", "Unauthorized");
  return currentUser;
};

module.exports = {
  isUserExist,
  authinticateUser,
  generateJWT,
  getCurrentUser,
};
