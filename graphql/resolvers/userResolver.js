const {
  isUserExist,
  authinticateUser,
  generateJWT,
} = require("../../helpers/userModelHelpers");
const User = require("../../models/User");

const userResolver = {
  Query: {
    getUsers: () => "USER FETCHED",
  },
  Mutation: {
    createUser: async (root, { newUser }) => {
      await isUserExist(newUser.email);
      const createdUser = await User.create(newUser);
      return createdUser;
    },
    login: async (root, { loginData: { email, password } }) => {
      const currentUser = await authinticateUser(email, password);
      const token = generateJWT(email, currentUser._id);
      const sentUser = {
        id: currentUser._id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        articles: currentUser.articles,
      };
      return { token, user: sentUser };
    },
  },
};

module.exports = userResolver;
