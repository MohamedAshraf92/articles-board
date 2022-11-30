const { getCurrentUser } = require("../../helpers/userModelHelpers");
const Article = require("../../models/Article");

const articleResolver = {
  Query: {
    getAllArticles: async (root, args, ctx) => {
      const user = await getCurrentUser(ctx.authHeader);
      const articles = await Article.find().populate(["author", "category"]);
      return articles;
    },
  },
  Mutation: {
    addArticle: async (root, { newArticle }) => {
      const createdArticle = await Article.create(newArticle);
      return createdArticle;
    },
  },
};

module.exports = articleResolver;
