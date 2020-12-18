import knex from '../../../databases'
import { verifyPassword } from '../../../utils/util.encrypt'
import { encodedJwt } from '../../../utils/util.jwt'
import { errorMessage } from '../../../utils/util.errorMessage'

export const usersLogin = async (_, { input }) => {
	const { email, password } = input

	const users = await knex('users').where({ email: email }).select('*')

	if (users.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Users account is not exists, please register'
		})
	}

	if (users[0].active == false) {
		throw errorMessage({
			status: 400,
			message: 'Users account is not active, please resend token'
		})
	}

	const comparePassword = verifyPassword(password, users[0].password)
	if (!comparePassword) {
		throw errorMessage({
			status: 400,
			message: 'Username/Password is wrong'
		})
	}

	const accessToken = encodedJwt({ email }, { expiresIn: '1d' })
	return {
		message: 'Login successfuly',
		access_token: accessToken
	}
}
