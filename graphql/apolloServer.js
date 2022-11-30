const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./typeDefs.js");
const resolvers = require("./resolvers.js");
const { getCurrentUser } = require("../helpers/userModelHelpers.js");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || "";
    // const user = getCurrentUser(authHeader);
    // return { user };
    return { authHeader };
  },
});

module.exports = apolloServer;
