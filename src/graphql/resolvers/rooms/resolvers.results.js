import knex from '../../../databases'
import { errorMessage } from './../../../utils/util.errorMessage'

export const roomsResults = async (_, args, { isAuthJwt }) => {
	if (!isAuthJwt) {
		throw errorMessage({
			status: 401,
			message: 'Unauthorization access token expired or invalid'
		})
	}

	const rooms = await knex('rooms').select()

	if (rooms.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Rooms is not exists or deleted from owner'
		})
	}

	return { message: 'Rooms already to use', rooms: rooms }
}
