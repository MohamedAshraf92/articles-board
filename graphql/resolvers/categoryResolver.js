const { ApolloError } = require("apollo-server-express");

const { getCurrentUser } = require("../../helpers/userModelHelpers");
const Category = require("../../models/Category");

const categoryResolver = {
  Query: {
    getCategories: async (root, args, ctx) => {
      const currentUser = await getCurrentUser(ctx.authHeader);
      const categories = await Category.find();
      return categories;
    },
  },
  Mutation: {
    addCategory: async (root, { name }) => {
      const createdCategory = await Category.create({ name });
      return createdCategory;
    },
  },
};

module.exports = categoryResolver;
