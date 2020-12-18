// import knex from '../databases'
// import { decodedJwt } from '../utils/util.jwt'
// import { message } from '../utils/util.message'

// module.exports = async (req, res, next) => {
// 	const tokenHeader = req.headers.authorization

// 	if (!tokenHeader) {
// 		message({
// 			response: res,
// 			statusCode: 401,
// 			method: req.method,
// 			message: 'Unauthorization access token is required'
// 		})
// 	}

// 	try {
// 		const { email } = decodedJwt(tokenHeader.split('Bearer ')[1])
// 		const findUser = await knex('users').where({ email: email }).select()
// 		if (findUser.length > 0) {
// 			req.users = findUser[0]
// 			return next()
// 		}
// 	} catch (err) {
// 		return res.status(401).status({
// 			status: res.statusCode,
// 			method: req.method,
// 			message: 'Unauthorization access token expired'
// 		})
// 	}
// }
