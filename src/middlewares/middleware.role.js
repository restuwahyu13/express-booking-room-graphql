import knex from '../databases'
import { decodedJwt } from '../utils/util.jwt'

export const authRole = () => async (req, res, next) => {
	if (req.headers.authorization) {
		const tokenHeader = req.headers.authorization
		try {
			const { email } = decodedJwt(tokenHeader.split('Bearer ')[1])
			const findUser = await knex('users').where({ email: email }).select()

			switch (findUser[0].role) {
				case 'users':
					return next()
				default:
					req.roles = findUser[0]
					return next()
			}
		} catch (err) {
			return next()
		}
	}
	return next()
}
