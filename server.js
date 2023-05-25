const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const resolvers = require("./resolver");
const typeDefs = require("./typeDef");
// const express = require("graphql");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use((req, res) => {
    res.send("hello from server");
  });

  mongoose
    .connect(
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2",
      {}
    )
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(`Error in db connectivity:: ${err}`);
    });

  app.listen(4000, () => console.log("running now!"));
}
startServer();
