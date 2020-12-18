import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

export const app = express()
export const server = new ApolloServer({
	schema: applyMiddleware(makeExecutableSchema({ typeDefs, resolvers })),
	uploads: false,
	introspection: true,
	playground: true,
	formatError: ({ message, positions, originalError }) => ({ message, positions, originalError }),
	formatResponse: ({ data, errors, http }) => ({ data, errors, http }),
	context: ({ req }) => {
		if (req.headers.authorization !== '') {
			const isAuthJwt = req.users || null
			const isAuthRole = req.roles || null
			return { isAuthJwt, isAuthRole }
		} else {
			return false
		}
	}
})
