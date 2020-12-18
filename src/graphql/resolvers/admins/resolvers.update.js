import knex from '../../../databases'
import { hashPassword } from '../../../utils/util.encrypt'
import { errorMessage } from '../../../utils/util.errorMessage'
import { fileUpload } from '../../../utils/util.upload'

export const adminsUpdate = async (_, { id, input, photo }) => {
	const { email, password } = input
	const { filename, createReadStream } = await photo.promise
	fileUpload({ filename, stream: createReadStream() })

	const users = await knex('users').where({ user_id: id }).select()

	if (users.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const updateUser = await knex('users')
		.where({ user_id: id })
		.update({
			email,
			password: hashPassword(password),
			photo: filename,
			updated_at: new Date()
		})

	if (updateUser < 1) {
		throw errorMessage({
			status: 400,
			message: 'Data failed to updated'
		})
	}

	return { message: 'Data success to updated' }
}
