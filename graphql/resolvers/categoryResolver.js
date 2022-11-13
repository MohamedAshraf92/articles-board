const Category = require("../../models/Category");

const categoryResolver = {
  Query: {
    getCategories: async () => {
      const categories = await Category.find();
      return categories;
    },
  },
  Mutation: {
    addCategory: async (root, { name }) => {
      const createdCategory = await Category.create({ name });
      console.log({ name });
      console.log({ createdCategory });
      return createdCategory;
    },
  },
};

module.exports = categoryResolver;
