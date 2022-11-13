const { gql } = require("apollo-server-express");

const Articles = gql`
  type Article {
    id: ID
    author: User
    title: String
    content: String
    tags: [String]
    category: [Category]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    articles: [Article]
  }

  type Category {
    id: ID
    name: String
  }

  type Query {
    getArticles: [Article]
  }

  input newArticle {
    author: ID
    title: String
    content: String
    tags: [String]
    category: [ID]
  }

  type Mutation {
    addArticle(newArticle: newArticle): Article
  }
`;

module.exports = Articles;
