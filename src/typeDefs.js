const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  scalar Date
  scalar Time
  scalar DateTime

  type Query {
    me: User
    scores(search: String): [Score!]
    score(scoreId: Int!): Score
    publicScores: [Score!]
    searchScores(phrase: String!): [Score!]
    myScores: [Score!]
  }

  type Mutation {
    register(name: String! email: String! password: String!): User!
    login(name: String! password: String!): LoginResponse!
    uploadScore(score: ScoreInput! file: Upload!): Score!
    setFavourite(scoreId: Int! favourite: Boolean!): Score!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
    favourites(search: String): [Score]
    uploads(search: String): [Score]
  }

  input UserInput {
    id: ID #TODO - remove?
    name: String
    email: String
    password: String
    public: Boolean
  }

  type Score {
    id: ID
    title: String
    subtitle: String
    composer: String
    lyricist: String
    owner: User
    private: Boolean
    favourite: Boolean
    sharedTo: [User]
    object_key: String #TODO - remove?
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