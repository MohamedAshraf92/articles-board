const Article = require("../../models/Article");

const articleResolver = {
  Query: {
    getArticles: async () => {
      const articles = await Article.find().populate(["author", "category"]);
      return articles;
    },
  },
  Mutation: {
    addArticle: async (root, { newArticle }) => {
      const createdArticle = await Article.create(newArticle);
      console.log({ newArticle });
      console.log({ createdArticle });
      return createdArticle;
    },
  },
};

module.exports = articleResolver;
