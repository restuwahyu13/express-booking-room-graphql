import knex from '../../../databases'
import sendgridMail from '@sendgrid/mail'
sendgridMail.setApiKey(process.env.SG_SECRET)
import { fileUpload } from '../../../utils/util.upload'
import { hashPassword } from '../../../utils/util.encrypt'
import { encodedJwt } from '../../../utils/util.jwt'
import { errorMessage } from '../../../utils/util.errorMessage'
import { tempMailRegister } from '../../../templates/template.register'

export const usersRegister = async (_, { input, photo }) => {
	const { email, password } = input
	const { filename, createReadStream } = await photo.promise

	const users = await knex('users').where({ email: email }).select('email')

	if (users.length > 0) {
		throw errorMessage({
			status: 409,
			message: 'Users already exists'
		})
	}

	const saveUsers = await knex('users').insert({
		email,
		password: hashPassword(password),
		photo: filename,
		created_at: new Date()
	})

	if (saveUsers.rowCount < 1) {
		throw errorMessage({
			status: 400,
			message: 'Registered new account failed'
		})
	}

	const tokenActivation = encodedJwt({ email }, { expiresIn: '5m' })
	const messageMail = tempMailRegister(email, tokenActivation)

	sendgridMail.send(messageMail, (err, response) => {
		if (err) throw err
		if (response[0].statusCode === 202) {
			fileUpload({ filename, stream: createReadStream() })
		}
	})

	return { message: 'Registered new account successfuly, please check your email' }
}
