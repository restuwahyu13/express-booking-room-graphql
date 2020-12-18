import knex from '../../../databases'
import { errorMessage } from './../../../utils/util.errorMessage'
import { existsSync, unlink } from 'fs'
import { resolve } from 'path'

export const roomsDelete = async (_, { id }) => {
	const findRoom = await knex('rooms').where({ room_id: id }).select()

	if (findRoom.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Room is not exists or deleted from owner'
		})
	}

	const checkPhoto = existsSync(resolve(process.cwd(), `src/images/${findRoom[0].photo}`))
	const deleteRoom = await knex('rooms').where({ room_id: id }).delete()

	if (deleteRoom < 1) {
		throw errorMessage({
			status: 400,
			message: 'Room failed to deleted'
		})
	}

	if (checkPhoto && deleteRoom == 1) {
		unlink(resolve(process.cwd(), `src/images/${findRoom[0].photo}`), (error) => {
			if (error) throw error
			return
		})
	}

	return { message: 'Room success to deleted' }
}
