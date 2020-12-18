import knex from '../databases'
import { decodedJwt } from '../utils/util.jwt'

export const authJwt = () => async (req, res, next) => {
	if (req.headers.authorization) {
		const tokenHeader = req.headers.authorization
		try {
			const { email } = decodedJwt(tokenHeader.split('Bearer ')[1])
			const findUser = await knex('users').where({ email: email }).select()
			if (findUser.length > 0) {
				req.users = findUser[0]
				return next()
			}
		} catch (err) {
			return next()
		}
	}
	return next()
}
