import { AuthenticationError, gql, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

const typeDef = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (...args) => {
      const context = args[2]
      if (!context || !context.user) {
        throw new AuthenticationError('Not allowed')
      }

      return resolve.apply(this, args)
    }
  }
}

export default {
  typeDef,
  directive: IsAuthenticatedDirective,
}
