const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime

  type Query {
    me: User
    publicScores: [Score!]
    searchScores(phrase: String!): [Score!]
    myScores: [Score!]
  }

  type Mutation {
    register(name: String! email: String! password: String!): User!
    login(name: String! password: String!): LoginResponse!
    uploadScore(score: ScoreInput! file: Upload!): Score!
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

  input UserInput {
    id: ID
    name: String
    email: String
    password: String
    public: Boolean
  }

  type Score {
    id: ID
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    subtitle: String
    composer: String
    lyricist: String
    owner: User
    private: Boolean
    sharedTo: [User]
    object_key: String
    link: String
  }

  input ScoreInput {
    id: ID
    title: String
    subtitle: String
    composer: String
    lyricist: String
    private: Boolean
  }
`;

exports.typeDefs = typeDefs;