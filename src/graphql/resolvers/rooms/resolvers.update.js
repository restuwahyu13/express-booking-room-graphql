import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'
import { fileUpload } from '../../../utils/util.upload'

export const roomsUpdate = async (_, { id, input, photo }, { isAuthRole }) => {
	if (!isAuthRole) {
		throw errorMessage({
			status: 403,
			message: 'Forbidden admin area cannot access this API'
		})
	}

	const { room_name, room_capacity, room_status } = input
	const { filename, createReadStream } = await photo.promise
	fileUpload({ filename, stream: createReadStream() })

	const rooms = await knex('rooms').where({ room_id: id }).select()

	if (rooms.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Room is not exists or deleted from owner'
		})
	}

	const updateRoom = await knex('rooms').where({ room_id: id }).update({
		room_name,
		room_capacity,
		photo: filename,
		room_status,
		updated_at: new Date()
	})

	if (updateRoom < 1) {
		throw errorMessage({
			status: 400,
			message: 'Room failed to updated'
		})
	}

	return { message: 'Room success to updated' }
}
