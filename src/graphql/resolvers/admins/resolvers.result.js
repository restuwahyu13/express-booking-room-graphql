import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const adminsResult = async (_, { id }) => {
	const user = await knex('users').where({ user_id: id }).select()

	if (user.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Admins account is not exists or deleted from owner'
		})
	}

	return {
		message: 'Data already to use',
		user: user[0]
	}
}
