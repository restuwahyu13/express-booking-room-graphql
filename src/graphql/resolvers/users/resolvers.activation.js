import knex from '../../../databases'
import { decodedJwt } from '../../../utils/util.jwt'
import { errorMessage } from '../../../utils/util.errorMessage'

export const usersActivation = async (_, { params }) => {
	try {
		const { token } = params
		const decoded = decodedJwt(token, process.env.JWT_SECRET)

		const users = await knex('users').where({ email: decoded.email }).select('user_id')
		const activationSuccess = await knex('users').where({ user_id: users[0].user_id }).update({ active: true })

		if (activationSuccess == false) {
			throw errorMessage({
				status: 400,
				message: 'Users account is not active, please resend token'
			})
		}

		return { message: 'Users account hash been active, please login' }
	} catch (err) {
		throw errorMessage({
			status: 401,
			message: 'Unauthorization activation token expired'
		})
	}
}
