const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime
} = require("graphql-iso-date");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadToStorage, getResourceUrl } = require('./storage');
const { query } = require('./db/connect');

const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

  Query: {
    me: async (_, args, { db, user }) => {
      if (!user){ throw new Error('Not Authenticated'); } 
      const res = await db.query.getUserById(user.id);
      return res.rows ? res.rows[0] : null;
    },
    publicScores: async (_, args, { db }) => {
      const res = await db.query.scoresPublic();
      return res.rows;
    },
    myScores: async (_, args, { db, user }) => {
      if (!user){ throw new Error('Not Authenticated'); }
      const res = await db.query.scoresByOwnerId(user.id);
      return res.rows;
    },
    searchScores: async (_, { phrase }, { db }) => {
      const res = await db.query.searchScores(phrase);
      return res.rows;
    },
    myFavourites: async (_, args, { db, user}) =>
      await db.query.favouriteScores(user.id),
  },

  Mutation: {
    register: async (_, { name, email, password }, { db }) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await db.mutation.createUser(
        name,
        email,
        hashedPassword,
      )
      return user
    },
    login: async (_, { name, password }, { db, user }) => {
      const res = await db.query.getUserWithCredentials(name)
      if (!res) { throw new Error('Invalid Login') }

      const foundUser = res.rows[0]
    
      const passwordMatch = await bcrypt.compare(password, foundUser.password)
      if (!passwordMatch) { throw new Error('Invalid Login') }
    
      const token = jwt.sign(
        {
          id: foundUser.id,
          name: foundUser.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      )
      return {
        token,
        user: foundUser,
      }
    },
    uploadScore: async (_, { score, file }, { db, user }) => {
      const { createReadStream } = await file;
      const stream = createReadStream();

      const object_key =  await uploadToStorage(stream);

      const result = await db.mutation.createScore({
        ...score,
        object_key,
        owner_id: user.id
      });

      return result.rows ? result.rows[0] : null;
    },
    setFavourite: async (_, { scoreId, favourite }, { db, user }) => {
      return await db.mutation.setFavourite(user.id, scoreId, favourite);
    }
  },

  Score: {
    favourite: async (parent, _, { db, user }) => {
      if (!user) return null;
      if (!parent.id) return null;

      const res = await query(
        `SELECT 1 FROM scores S INNER JOIN favourites F ON (S.id = F.score_id)`
      )

      if (res.rows.length > 0) { return true; }
      else { return false; }
    },
    owner: async (parent, _, { db }) => {
      const res = await db.query.getUserById(parent.owner_id)
      return res.rows ? res.rows[0] : null;
    },
    link: parent => getResourceUrl(parent.object_key),
  }
}

exports.resolvers = resolvers;