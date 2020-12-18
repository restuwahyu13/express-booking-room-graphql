import graphqlPlayground from 'graphql-playground-middleware-express'

module.exports = (app) => {
	app.get('/', graphqlPlayground({ endpointL: '/graphql' }))
}
