const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime
} = require("graphql-iso-date");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

  Query: {
    me: async (_, args, ctx) => {
        // this if statement is our authentication check
        if (!ctx.user) {
          throw new Error('Not Authenticated')
        }
        return ctx.prisma.query.user({ where: { id: ctx.user.id }})
    },
  },

  Mutation: {
    register: async (parent, { name, email, password }, ctx, info) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await ctx.prisma.mutation.createUser({ data:{
        name,
        email,
        password: hashedPassword,
        public: false,
      }})
      return user
    },
    login: async (parent, { name, password }, ctx, info) => {
      const user = await ctx.prisma.query.user({where: { name }})
      if (!user) {
        throw new Error('Invalid Login')
      }
    
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        throw new Error('Invalid Login')
      }
    
      const token = jwt.sign(
        {
          id: user.id,
          username: user.name,
        },
        'my-secret-from-env-file-in-prod',
        {
          expiresIn: '30d', // token will expire in 30days
        },
      )
      return {
        token,
        user,
      }
    }
  },
}

exports.resolvers = resolvers;