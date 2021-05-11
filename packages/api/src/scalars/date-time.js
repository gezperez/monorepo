import { gql } from 'apollo-server-express'
import { GraphQLScalarType, Kind } from 'graphql'

const typeDef = gql`
  scalar Date
`

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'A Date representation in ISO format',
  parseValue(value) {
    return value
  },
  serialize(value) {
    return value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }

    return null
  },
})

export default {
  typeDef,
  resolvers: {
    Date,
  },
}
