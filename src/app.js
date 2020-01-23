const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { existsSync, mkdirSync } = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const query = require('./db/query');
const mutation = require('./db/mutation');


const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (err) {
    return null
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);

    return {
      req,
      user,
      db: {
        query,
        mutation,
      }
    };
  }
});

existsSync(path.join(__dirname, "./scores")) || mkdirSync(path.join(__dirname, "./scores"));

const app = express();

/* const allowedOrigins = [
  'http://localhost:8081',
  'http://localhost:4000',
  'http://localhost:4466',
]
const corsOptions = {
  origin: function(origin, callback){
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
} */
app.use(cors());

app.use("/scores", express.static(path.join(__dirname, "./scores")));
server.applyMiddleware({ app, cors: false });


app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});