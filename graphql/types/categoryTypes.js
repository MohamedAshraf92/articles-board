const { gql } = require("apollo-server-express");

const Category = gql`
  type Category {
    id: ID
    name: String
  }

  type Query {
    getCategories: [Category]
  }

  type Mutation {
    addCategory(name: String): Category
  }
`;

module.exports = Category;
