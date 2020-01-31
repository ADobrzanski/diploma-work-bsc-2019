const joinMonsterExtendedSchema = {
  Query: {
    fields: {
      me: {
        where: (usersTable, _, ctx) => {
          return `${usersTable}.id = ${ctx.user.id}`
        }
      },
    }
  },

  User: {
    sqlTable: 'users',
    uniqueKey: 'id',
    fields: {
      name: { sqlColumn: 'name' },
      email: { sqlColumn: 'email' },
      favourites: {
        junction: {
          sqlTable: 'favourites',
          sqlJoins: [
            (tUsers, tFavourites) => `${tUsers}.id = ${tFavourites}.user_id`,
            (tFavourites, tScores) => `${tFavourites}.score_id = ${tScores}.id`,
          ],
        },
          where: (tScores, args) => {
            if (!args.search || args.search === '') return null;
            return `${tScores}.title LIKE '%' || '${args.search}' || '%'` +
              ` OR ${tScores}.composer LIKE '%' || '${args.search}' || '%'`;
          }
      }
    }
  },

  Score: {
    sqlTable: 'scores',
    uniqueKey: 'id',
    fields: {
      title: { sqlColumn: 'title' },
      subtitle: { sqlColumn: 'subtitle' },
      composer: { sqlColumn: 'composer' },
      lyricist: { sqlColumn: 'lyricist' },
      private: { sqlColumn: 'private' },
      object_key: { sqlColumn: 'object_key' },
    }
  }
}

module.exports = {
  joinMonsterExtendedSchema,
}