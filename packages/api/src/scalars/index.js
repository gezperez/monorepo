import Date from './date-time'

export default {
  typeDefs: [Date.typeDef],
  resolvers: {
    ...Date.resolvers,
  },
}
