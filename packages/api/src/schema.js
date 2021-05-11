import { gql } from 'apollo-server'

export default gql`
  type User {
    _id: ID
    userName: String!
    name: String!
    lastName: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: UserInput): User
    deleteUser(_id: ID): User
    updateUser(_id: ID, input: UpdateUserInput): User
  }

  input UserInput {
    userName: String!
    name: String!
    lastName: String!
    email: String!
  }

  input UpdateUserInput {
    userName: String
    name: String
    lastName: String
    email: String
  }
`
