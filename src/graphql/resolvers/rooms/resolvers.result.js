import knex from '../../../databases'
import { errorMessage } from './../../../utils/util.errorMessage'

export const roomsResult = async (_, { id }, { isAuthJwt }) => {
	if (!isAuthJwt) {
		throw errorMessage({
			status: 401,
			message: 'Unauthorization access token expired or invalid'
		})
	}

	const room = await knex('rooms').where({ room_id: id }).select()

	if (room.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Data is not exists or deleted from owner'
		})
	}

	return { message: 'Data already to use', room: room[0] }
}
