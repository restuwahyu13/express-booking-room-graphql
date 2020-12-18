import knex from '../../../databases'
import sendgridMail from '@sendgrid/mail'
sendgridMail.setApiKey(process.env.SG_SECRET)
import { encodedJwt } from '../../../utils/util.jwt'
import { errorMessage } from '../../../utils/util.errorMessage'
import { tempMailResend } from '../../../templates/template.resend'

export const usersResend = async (_, { input }) => {
	const { email } = input
	const users = await knex('users').where({ email: email }).select('*')

	if (users.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Users account is not exists, please register'
		})
	}

	if (users[0].active == true) {
		throw errorMessage({
			status: 400,
			message: 'Users account hash been active, please login'
		})
	}

	const tokenActivation = encodedJwt({ email }, { expiresIn: '5m' })
	const messageMail = tempMailResend(email, tokenActivation)

	await sendgridMail.send(messageMail, (error, response) => {
		if (error) throw error
		if (response[0].statusCode === 202) return
	})

	return {
		message: 'Resend new activation token successfuly, please check your email'
	}
}
