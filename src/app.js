const { ApolloServer } = require('apollo-server');
const { Prisma } = require('prisma-binding');
const jwt = require('jsonwebtoken');


const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');
const prismaTypeDefs = require('./generated/prisma-client/prisma-schema').typeDefs;

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
      prisma: new Prisma({
        typeDefs: prismaTypeDefs,
        endpoint: 'http://prisma_server:4466'
      })
    };
  }
});



server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});