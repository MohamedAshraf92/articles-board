const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers.js");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
};

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    startServer();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => console.log(error));
