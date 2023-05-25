const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

let message = "heyy babes";

const schema = buildSchema(`
    type User {
        name:String
        age:Int
        school:String
    }
    type Query {
        hello : String
        welcomeMessage(name:String,day:String!) : String
        getUser : User
        getString : String
    }
    type Mutation {
        updateString(newMessage:String) : String
    }
`);

const root = {
  hello: () => {
    return "Hello World";
  },
  welcomeMessage: (args) => {
    return `${args.name}, it's ${args.day}`;
  },
  getUser: () => {
    const user = {
      name: "Yours",
      age: 20,
      school: "Truly",
    };
    return user;
  },
  getString: () => {
    return message;
  },
  updateString: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => console.log("listening on 4000!"));
