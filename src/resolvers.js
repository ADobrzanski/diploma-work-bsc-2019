const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime
} = require("graphql-iso-date");
const { createBatchResolver } = require('graphql-resolve-batch');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadToStorage, getResourceUrl } = require('./storage');
const { query } = require('./db/connect');
const joinMonster = require('join-monster').default;

const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

  Query: {
    me: async (_, args, ctx, info) => {
      if (!ctx.user){ throw new Error('Not Authenticated'); } 
      const res = await joinMonster(info, ctx, sql => {
        return query(sql);
      })
      console.log(res)
      return res
    },
    scores: async (_, args, ctx, info) => {
      return await joinMonster(info, ctx, sql => {
        return query(sql);
      })
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
    score: async (_, args, ctx, info) => {
      return await joinMonster(info, ctx, sql => {
        return query(sql);
      });
    }
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
        user: { ...foundUser, password: null },
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
    favourite: createBatchResolver(async (scores, args, { db, user }) => {
      if (!user) {
        return scores.map(_ => false);
      } else {
        const scoreIds = scores.map(score => score.id);
        const dollars = scoreIds.map((_, idx) => `$${idx+2}`).join(', ');
        const favourites = await query({
          text:
            `SELECT score_id FROM favourites`+
            ` WHERE score_id IN (${dollars}) AND user_id = $1`,
          values: [user.id, ...scoreIds],
        }).then(({ rows }) => rows.map(fav => fav.score_id))
        .catch(console.error);

        return scores.map(score => favourites.includes(score.id));
      }
    }),
    owner: async (parent, _, { db }) => {
      const res = await db.query.getUserById(parent.owner_id)
      return res.rows ? res.rows[0] : null;
    },
    link: parent => getResourceUrl(parent.object_key),
  }
}

exports.resolvers = resolvers;