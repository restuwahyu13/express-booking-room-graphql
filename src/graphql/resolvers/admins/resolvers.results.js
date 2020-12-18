import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const adminsResults = async () => {
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
