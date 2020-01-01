module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateScore {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createScore(data: ScoreCreateInput!): Score!
  updateScore(data: ScoreUpdateInput!, where: ScoreWhereUniqueInput!): Score
  updateManyScores(data: ScoreUpdateManyMutationInput!, where: ScoreWhereInput): BatchPayload!
  upsertScore(where: ScoreWhereUniqueInput!, create: ScoreCreateInput!, update: ScoreUpdateInput!): Score!
  deleteScore(where: ScoreWhereUniqueInput!): Score
  deleteManyScores(where: ScoreWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  score(where: ScoreWhereUniqueInput!): Score
  scores(where: ScoreWhereInput, orderBy: ScoreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Score]!
  scoresConnection(where: ScoreWhereInput, orderBy: ScoreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScoreConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Score {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  composer: String
  lyricist: String
  owner: User!
  private: Boolean!
  sharedTo(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type ScoreConnection {
  pageInfo: PageInfo!
  edges: [ScoreEdge]!
  aggregate: AggregateScore!
}

input ScoreCreateInput {
  id: ID
  title: String!
  composer: String
  lyricist: String
  owner: UserCreateOneWithoutUploadsInput!
  private: Boolean!
  sharedTo: UserCreateManyWithoutSharedWithInput
}

input ScoreCreateManyWithoutOwnerInput {
  create: [ScoreCreateWithoutOwnerInput!]
  connect: [ScoreWhereUniqueInput!]
}

input ScoreCreateManyWithoutSharedToInput {
  create: [ScoreCreateWithoutSharedToInput!]
  connect: [ScoreWhereUniqueInput!]
}

input ScoreCreateWithoutOwnerInput {
  id: ID
  title: String!
  composer: String
  lyricist: String
  private: Boolean!
  sharedTo: UserCreateManyWithoutSharedWithInput
}

input ScoreCreateWithoutSharedToInput {
  id: ID
  title: String!
  composer: String
  lyricist: String
  owner: UserCreateOneWithoutUploadsInput!
  private: Boolean!
}

type ScoreEdge {
  node: Score!
  cursor: String!
}

enum ScoreOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  composer_ASC
  composer_DESC
  lyricist_ASC
  lyricist_DESC
  private_ASC
  private_DESC
}

type ScorePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  composer: String
  lyricist: String
  private: Boolean!
}

input ScoreScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  composer: String
  composer_not: String
  composer_in: [String!]
  composer_not_in: [String!]
  composer_lt: String
  composer_lte: String
  composer_gt: String
  composer_gte: String
  composer_contains: String
  composer_not_contains: String
  composer_starts_with: String
  composer_not_starts_with: String
  composer_ends_with: String
  composer_not_ends_with: String
  lyricist: String
  lyricist_not: String
  lyricist_in: [String!]
  lyricist_not_in: [String!]
  lyricist_lt: String
  lyricist_lte: String
  lyricist_gt: String
  lyricist_gte: String
  lyricist_contains: String
  lyricist_not_contains: String
  lyricist_starts_with: String
  lyricist_not_starts_with: String
  lyricist_ends_with: String
  lyricist_not_ends_with: String
  private: Boolean
  private_not: Boolean
  AND: [ScoreScalarWhereInput!]
  OR: [ScoreScalarWhereInput!]
  NOT: [ScoreScalarWhereInput!]
}

type ScoreSubscriptionPayload {
  mutation: MutationType!
  node: Score
  updatedFields: [String!]
  previousValues: ScorePreviousValues
}

input ScoreSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScoreWhereInput
  AND: [ScoreSubscriptionWhereInput!]
}

input ScoreUpdateInput {
  title: String
  composer: String
  lyricist: String
  owner: UserUpdateOneRequiredWithoutUploadsInput
  private: Boolean
  sharedTo: UserUpdateManyWithoutSharedWithInput
}

input ScoreUpdateManyDataInput {
  title: String
  composer: String
  lyricist: String
  private: Boolean
}

input ScoreUpdateManyMutationInput {
  title: String
  composer: String
  lyricist: String
  private: Boolean
}

input ScoreUpdateManyWithoutOwnerInput {
  create: [ScoreCreateWithoutOwnerInput!]
  delete: [ScoreWhereUniqueInput!]
  connect: [ScoreWhereUniqueInput!]
  set: [ScoreWhereUniqueInput!]
  disconnect: [ScoreWhereUniqueInput!]
  update: [ScoreUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [ScoreUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [ScoreScalarWhereInput!]
  updateMany: [ScoreUpdateManyWithWhereNestedInput!]
}

input ScoreUpdateManyWithoutSharedToInput {
  create: [ScoreCreateWithoutSharedToInput!]
  delete: [ScoreWhereUniqueInput!]
  connect: [ScoreWhereUniqueInput!]
  set: [ScoreWhereUniqueInput!]
  disconnect: [ScoreWhereUniqueInput!]
  update: [ScoreUpdateWithWhereUniqueWithoutSharedToInput!]
  upsert: [ScoreUpsertWithWhereUniqueWithoutSharedToInput!]
  deleteMany: [ScoreScalarWhereInput!]
  updateMany: [ScoreUpdateManyWithWhereNestedInput!]
}

input ScoreUpdateManyWithWhereNestedInput {
  where: ScoreScalarWhereInput!
  data: ScoreUpdateManyDataInput!
}

input ScoreUpdateWithoutOwnerDataInput {
  title: String
  composer: String
  lyricist: String
  private: Boolean
  sharedTo: UserUpdateManyWithoutSharedWithInput
}

input ScoreUpdateWithoutSharedToDataInput {
  title: String
  composer: String
  lyricist: String
  owner: UserUpdateOneRequiredWithoutUploadsInput
  private: Boolean
}

input ScoreUpdateWithWhereUniqueWithoutOwnerInput {
  where: ScoreWhereUniqueInput!
  data: ScoreUpdateWithoutOwnerDataInput!
}

input ScoreUpdateWithWhereUniqueWithoutSharedToInput {
  where: ScoreWhereUniqueInput!
  data: ScoreUpdateWithoutSharedToDataInput!
}

input ScoreUpsertWithWhereUniqueWithoutOwnerInput {
  where: ScoreWhereUniqueInput!
  update: ScoreUpdateWithoutOwnerDataInput!
  create: ScoreCreateWithoutOwnerInput!
}

input ScoreUpsertWithWhereUniqueWithoutSharedToInput {
  where: ScoreWhereUniqueInput!
  update: ScoreUpdateWithoutSharedToDataInput!
  create: ScoreCreateWithoutSharedToInput!
}

input ScoreWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  composer: String
  composer_not: String
  composer_in: [String!]
  composer_not_in: [String!]
  composer_lt: String
  composer_lte: String
  composer_gt: String
  composer_gte: String
  composer_contains: String
  composer_not_contains: String
  composer_starts_with: String
  composer_not_starts_with: String
  composer_ends_with: String
  composer_not_ends_with: String
  lyricist: String
  lyricist_not: String
  lyricist_in: [String!]
  lyricist_not_in: [String!]
  lyricist_lt: String
  lyricist_lte: String
  lyricist_gt: String
  lyricist_gte: String
  lyricist_contains: String
  lyricist_not_contains: String
  lyricist_starts_with: String
  lyricist_not_starts_with: String
  lyricist_ends_with: String
  lyricist_not_ends_with: String
  owner: UserWhereInput
  private: Boolean
  private_not: Boolean
  sharedTo_some: UserWhereInput
  AND: [ScoreWhereInput!]
}

input ScoreWhereUniqueInput {
  id: ID
}

type Subscription {
  score(where: ScoreSubscriptionWhereInput): ScoreSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String!
  password: String!
  uploads(where: ScoreWhereInput, orderBy: ScoreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Score!]
  sharedWith(where: ScoreWhereInput, orderBy: ScoreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Score!]
  public: Boolean!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  password: String!
  uploads: ScoreCreateManyWithoutOwnerInput
  sharedWith: ScoreCreateManyWithoutSharedToInput
  public: Boolean!
}

input UserCreateManyWithoutSharedWithInput {
  create: [UserCreateWithoutSharedWithInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutUploadsInput {
  create: UserCreateWithoutUploadsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutSharedWithInput {
  id: ID
  name: String!
  email: String!
  password: String!
  uploads: ScoreCreateManyWithoutOwnerInput
  public: Boolean!
}

input UserCreateWithoutUploadsInput {
  id: ID
  name: String!
  email: String!
  password: String!
  sharedWith: ScoreCreateManyWithoutSharedToInput
  public: Boolean!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  public_ASC
  public_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String!
  password: String!
  public: Boolean!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  public: Boolean
  public_not: Boolean
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  uploads: ScoreUpdateManyWithoutOwnerInput
  sharedWith: ScoreUpdateManyWithoutSharedToInput
  public: Boolean
}

input UserUpdateManyDataInput {
  name: String
  email: String
  password: String
  public: Boolean
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  public: Boolean
}

input UserUpdateManyWithoutSharedWithInput {
  create: [UserCreateWithoutSharedWithInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutSharedWithInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutSharedWithInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredWithoutUploadsInput {
  create: UserCreateWithoutUploadsInput
  update: UserUpdateWithoutUploadsDataInput
  upsert: UserUpsertWithoutUploadsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutSharedWithDataInput {
  name: String
  email: String
  password: String
  uploads: ScoreUpdateManyWithoutOwnerInput
  public: Boolean
}

input UserUpdateWithoutUploadsDataInput {
  name: String
  email: String
  password: String
  sharedWith: ScoreUpdateManyWithoutSharedToInput
  public: Boolean
}

input UserUpdateWithWhereUniqueWithoutSharedWithInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutSharedWithDataInput!
}

input UserUpsertWithoutUploadsInput {
  update: UserUpdateWithoutUploadsDataInput!
  create: UserCreateWithoutUploadsInput!
}

input UserUpsertWithWhereUniqueWithoutSharedWithInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutSharedWithDataInput!
  create: UserCreateWithoutSharedWithInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  uploads_some: ScoreWhereInput
  sharedWith_some: ScoreWhereInput
  public: Boolean
  public_not: Boolean
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  name: String
  email: String
}
`
      }
    