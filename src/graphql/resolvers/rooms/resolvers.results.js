import knex from '../../../databases'
import { errorMessage } from './../../../utils/util.errorMessage'

export const roomsResults = async () => {
	const rooms = await knex('rooms').select()

	if (rooms.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Rooms is not exists or deleted from owner'
		})
	}

	return { message: 'Rooms already to use', rooms: rooms }
}
