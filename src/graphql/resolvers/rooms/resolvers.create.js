const knex = require('../../../databases')
import { errorMessage } from '../../../utils/util.errorMessage'
import { fileUpload } from '../../../utils/util.upload'

export const roomsCreate = async (_, { input, photo }) => {
	const { room_name, room_capacity } = input
	const { filename, createReadStream } = await photo.promise
	fileUpload({ filename, stream: createReadStream() })

	const rooms = await knex('rooms').where({ room_name: room_name }).select('room_name')

	if (rooms.length > 0) {
		throw errorMessage({
			status: 409,
			message: 'Room name already exists'
		})
	}

	const saveRoom = await knex('rooms').insert({
		room_name,
		room_capacity,
		photo: filename,
		created_at: new Date()
	})

	if (saveRoom.rowCount < 0) {
		throw errorMessage({
			status: 400,
			message: 'Failed to created room'
		})
	}

	return { message: 'Successfuly to created room' }
}
