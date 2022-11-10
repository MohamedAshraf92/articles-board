const User = {
  Query: {
    getUser: () => "USER FETCHED",
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const { firstName, lastName, email, password } = args.newUser;
      return `${firstName} ${lastName} has email: ${email}`;
    },
  },
};

module.exports = User;
