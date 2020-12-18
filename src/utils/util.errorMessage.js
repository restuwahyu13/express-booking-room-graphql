import { toApolloError } from 'apollo-server-express'

export const errorMessage = (handler) => {
	const { status, message } = handler
	return toApolloError(new Error(message), `${status}`)
}
