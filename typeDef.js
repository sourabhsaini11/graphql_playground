const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
  }

  type Query {
    hello: String
    getAllPost: [Post]
    getPost(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    addPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

module.exports = typeDefs;
