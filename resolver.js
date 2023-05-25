const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello!!";
    },
    getAllPost: async () => {
      const posts = await Post.find();
      return posts;
    },
    getPost: async (_, { id }, __, ___) => {
      const post = Post.findById(id);
      return post;
    },
  },
  Mutation: {
    addPost: async (_, args, __, ___) => {
      const { title, description } = args.post;

      const newPost = Post({ title, description });
      await newPost.save();

      return newPost;
    },
    deletePost: async (_, { id }, __, ___) => {
      await Post.findByIdAndDelete(id);
      return "Deleted!";
    },
    updatePost: async (_, args, __, ___) => {
      const { id } = args;
      const { title, description } = args.post;

      const updatedPost = {};
      if (title) updatedPost.title = title;
      if (description) updatedPost.description = description;

      const post = Post.findByIdAndUpdate(id, updatedPost, { new: true });

      return post;
    },
  },
};

module.exports = resolvers;
