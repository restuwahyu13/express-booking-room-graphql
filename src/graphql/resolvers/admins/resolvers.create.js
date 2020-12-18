import knex from '../../../databases'
import { hashPassword } from '../../../utils/util.encrypt'
import { errorMessage } from '../../../utils/util.errorMessage'
import { fileUpload } from '../../../utils/util.upload'

export const adminsCreate = async (_, { input, photo }) => {
	const { email, password } = input
	const { filename, createReadStream } = await photo.promise
	fileUpload({ filename, stream: createReadStream() })

	const users = await knex('users').where({ email: email }).select('email')

	if (users.length > 0) {
		throw errorMessage({
			status: 409,
			message: 'Admins account already exists'
		})
	}

	const saveUsers = await knex('users').insert({
		email,
		password: hashPassword(password),
		photo: filename,
		role: 'admins',
		active: true,
		created_at: new Date()
	})

	if (saveUsers.rowCount < 0) {
		throw errorMessage({
			status: 400,
			message: 'Registered new account failed'
		})
	}

	return { message: 'Registered new account successfuly' }
}
