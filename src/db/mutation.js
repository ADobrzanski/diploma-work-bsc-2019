const { query, transaction } = require('./connect')
const { tables, schemaOf } = require('./model')
const { USER, SCORE, CREDENTIAL, FAVOURITE } = tables;

const { pick, reject } = require('./utils')


const addUserQuery = (name, email) => {
  const { f_name, f_email } = schemaOf[USER]
  return ({
    text:
      `INSERT INTO ${USER}(${f_name}, ${f_email}) ` +
      `VALUES($1, $2) ` +
      `RETURNING *;`,
    values: [name, email]
  })
}

const addCredentialQuery = (userId, password) => {
  const { f_user_id, f_password } = schemaOf[CREDENTIAL]
  return ({
    text:
      `INSERT INTO ${CREDENTIAL}(${f_user_id}, ${f_password}) ` +
      `VALUES($1, $2);`,
    values: [userId, password]
  })
}

const createUser = (name, email, password) => async () => {
  const res = await query(addUserQuery(name, email))
  const userId = res.rows[0].id
  await query(addCredentialQuery(userId, password))

  return res.rows[0]
}

const isUndefined = val => val === undefined
const createScore = (scoreDetails) => {
  const viableParams = [...Object.values(schemaOf[SCORE])]
  let params = pick(viableParams)(scoreDetails)
      params = reject(isUndefined, params)
  return ({
    text: 
      `INSERT INTO ${SCORE} (${Object.keys(params).join(', ')}) ` +
      `VALUES (${Object.keys(params).map((_, idx) => `$${idx+1}`).join(', ')}) ` +
      `RETURNING *;`,
    values: Object.values(params)
  })
}

const createFavourite = (userId, scoreId) => {
  const { f_user_id, f_score_id } = schemaOf[FAVOURITE]
  return ({
    text:
      `INSERT INTO ${FAVOURITE}(${f_user_id}, ${f_score_id}) ` +
      `VALUES($1, $2) ` +
      `ON CONFLICT ON CONSTRAINT favourites_pkey DO NOTHING;`,
    values: [userId, scoreId]
  })
}

const removeFavourite = (userId, scoreId) => {
  const { f_user_id, f_score_id } = schemaOf[FAVOURITE]
  return ({
    text:
      `DELETE FROM ${FAVOURITE} ` +
      `WHERE ${f_user_id} = $1 AND ${f_score_id} = $2`,
    values: [userId, scoreId]
  })
}


module.exports = {
  createUser(name, email, password) { return transaction(createUser(name, email, password))},
  createScore(scoreDetails) { return query(createScore(scoreDetails))},
  setFavourite(userId, scoreId, favourite) {
    if (favourite) {
      return query(createFavourite(userId, scoreId))
    } else {
      return query(removeFavourite(userId, scoreId))
    }
  }
}