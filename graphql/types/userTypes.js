const { gql } = require("apollo-server-express");

const User = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    articles: [Article]
  }

  type Article {
    id: ID
    author: User
    title: String
    content: String
    tags: [String]
    category: [Category]
  }

  type Category {
    id: ID
    name: String
  }

  type LoggedUser {
    token: String
    user: User
  }

  type Query {
    getUsers: [User]
  }

  input NewUserData {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginData {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(newUser: NewUserData): User
    login(loginData: LoginData): LoggedUser
  }
`;

module.exports = User;
