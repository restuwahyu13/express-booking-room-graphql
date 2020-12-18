import knex from '../../../databases'
import { existsSync, unlink } from 'fs'
import { resolve } from 'path'
import { errorMessage } from '../../../utils/util.errorMessage'

export const adminsDelete = async (_, { id }) => {
	const findUser = await knex('users').where({ user_id: id }).select()

	if (findUser.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const checkPhoto = existsSync(resolve(process.cwd(), `src/images/${findUser[0].photo}`))
	const deleteUser = await knex('users').where({ user_id: id }).delete()

	if (deleteUser < 1) {
		throw errorMessage({
			status: 400,
			message: 'Data failed to deleted'
		})
	}

	if (checkPhoto && deleteUser == 1) {
		unlink(resolve(process.cwd(), `src/images/${findUser[0].photo}`), (error) => {
			if (error) throw error
			return
		})
	}

	return { message: 'Data success to deleted' }
}
