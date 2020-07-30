const { query } = require('./connect')
const { tables, schemaOf } = require('./model')
const { USER, SCORE, CREDENTIAL, FAVOURITE } = tables;

const getUserById = id => ({
  text: `SELECT * FROM ${USER} WHERE ${schemaOf[USER].f_id} = $1`,
  values: [id]
})

const getUserWithCredentials = name => {
  const { f_id } = schemaOf[USER]
  const { f_user_id } = schemaOf[CREDENTIAL]

  return ({
    text: 
      `SELECT * FROM ${USER} ` +
      `INNER JOIN ${CREDENTIAL} ` +
      `ON (${USER}.${f_id} = ${CREDENTIAL}.${f_user_id}) ` +
      `WHERE ${schemaOf[USER].f_name} = $1`,
    values: [name]
  })
}

const scoresPublic = () => ({
  text:
    `SELECT * FROM ${SCORE} S ` +
    `WHERE ${schemaOf[SCORE].f_isPrivate} = $1;`,
  values: [false]
})

const searchScores = (phrase) => {
  return ({
  text:
    `SELECT * ` +
    `FROM ${SCORE} ` +
    `WHERE ${schemaOf[SCORE].f_title} LIKE '%' || $1 || '%' ` +
    `OR ${schemaOf[SCORE].f_composer} LIKE '%' || $1 || '%' `,
  values: [phrase]
})
}

const scoresByOwnerId = (id) => ({
  text: `SELECT * FROM ${SCORE} WHERE ${schemaOf[SCORE].f_ownerId} = $1`,
  values: [id]
})

const getFavouriteScores = (userId) => ({
  text: 
    `SELECT * FROM ${SCORE} S ` +
    `INNER JOIN ${FAVOURITE} F ON (S.${schemaOf[SCORE].id} = F.${schemaOf[FAVOURITE].f_score_id}) ` +
    `WHERE S.${schemaOf[SCORE].f_ownerId} = $1`,
  values: [userId]
})

module.exports = {
  getUserById(id) { return query(getUserById(id)); },
  favouriteScores(userId) { return query(getFavouriteScores(userId)); },
  scoresPublic() { return query(scoresPublic()); },
  searchScores(phrase) { return query(searchScores(phrase)); },
  scoresByOwnerId(id) { return query(scoresByOwnerId(id)); },
  getUserWithCredentials(name) { return query(getUserWithCredentials(name)); }
}