const joinMonsterExtendedSchema = {
  Query: {
    fields: {
      me: {
        where: (usersTable, _, ctx) => {
          return `${usersTable}.id = ${ctx.user.id}`
        }
      },
      scores: {
        where: (score, { search }, ctx) => {
          const { user } = ctx;
          const conditions = [];

          let where = `${score}.private = false`;
              where += !!user
                ? ` OR ${score}.owner_id = ${user.id}`
                : ``;

          conditions.push(`(${where})`);
          if(search) {
            let searchCondition = 
              `${score}.title ILIKE '%${search}%' ` +
              `OR ${score}.composer ILIKE '%${search}%'`;

            searchCondition = `(${searchCondition})`;
            conditions.push(searchCondition);
          }
          
          return conditions.join(' AND ');
        }
      },
      score: {
        where: (score, { scoreId }, ctx) => {
          const { user } = ctx;
          const conditions = [];

          let where = `${score}.private = false`;
              where += !!user
                ? ` OR ${score}.owner_id = ${user.id}`
                : ``;

          conditions.push(`(${where})`);
          conditions.push(`${score}.id = ${scoreId}`)
          
          return conditions.join(' AND ');
        }
      }
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
          return `${tScores}.title ILIKE '%' || '${args.search}' || '%'` +
            ` OR ${tScores}.composer ILIKE '%' || '${args.search}' || '%'`;
        },
      },
      uploads: {
        sqlJoin: (users, scores, args) => `${users}.id = ${scores}.owner_id`,
        where: (scores, { search }) => {
          if (!search || search === '') return null;
          return `${scores}.title ILIKE '%${search}%'` +
            ` OR ${scores}.composer ILIKE '%${search}%'`;
        },
      },
    },
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
      link: { sqlDeps: ['object_key'] },
    }
  }
}

module.exports = {
  joinMonsterExtendedSchema,
}