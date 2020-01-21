
const { Pool } = require('pg')

const pool = new Pool({
  // TODO move DB_NAME to DB_URI in docker-compose
  connectionString: process.env.DB_URI + '/diploma_work', 
})

const transaction = async (transactionBody) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const res = await transactionBody();
    await client.query('COMMIT')
    return res;
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
  transaction: func => transaction(func),
}