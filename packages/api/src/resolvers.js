import User from './models/User'

export default {
  Query: {
    users: async (_, args, ctx) => {
      // eslint-disable-next-line no-console
      console.error('CONTEXT', _, args, ctx)

      return User.find()
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = new User(input)
      await newUser.save()

      return newUser
    },
    deleteUser: (_, { _id }) => User.findByIdAndDelete(_id),
    updateUser: (_, { _id, input }) => User.findByIdAndUpdate(_id, input, { new: true }),
  },
}
