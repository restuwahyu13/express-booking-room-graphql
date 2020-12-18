import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const adminsResults = async (_, args, { isAuthRole }) => {
	if (!isAuthRole) {
		throw errorMessage({
			status: 403,
			message: 'Forbidden admin area cannot access this API'
		})
	}

	const users = await knex('users').select()
	if (users.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Admin account is not exists or deleted from owner'
		})
	}

	return {
		message: 'Data already to use',
		users: users
	}
}
