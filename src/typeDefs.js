const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime

  type Query {
    me: User!
  }

  type Mutation {
    register(name: String! email: String! password: String!): User!
    login(name: String! password: String!): LoginResponse!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type User {
    id: ID
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    email: String
    password: String
    uploads: [Score]
    sharedWith: [Score]
    public: Boolean
  }

  type Score {
    id: ID
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    composer: String
    lyricist: String
    owner: User
    private: Boolean
    sharedTo: [User]
  }

`;

exports.typeDefs = typeDefs;