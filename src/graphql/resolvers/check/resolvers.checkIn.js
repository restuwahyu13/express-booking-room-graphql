import knex from '../../../databases'
import sendgridMail from '@sendgrid/mail'
sendgridMail.setApiKey(process.env.SG_SECRET)
import { tempMailCheckin } from '../../../templates/template.checkIn'
import { dateFormat } from '../../../utils/util.dateFormat'
import { errorMessage } from '../../../utils/util.errorMessage'

export const checkIn = async (_, { id }, { isAuthJwt }) => {
	if (!isAuthJwt) {
		throw errorMessage({
			status: 401,
			message: 'Unauthorization access token expired or invalid'
		})
	}

	const checkIn = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.where({ 'bookings.order_id': id })
		.select(['bookings.order_id', 'bookings.check_in_time', 'users.email'])

	const { order_id, check_in_time, email } = checkIn[0]

	if (checkIn.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Check in room failed order_id is not exists'
		})
	}

	if (check_in_time !== null) {
		throw errorMessage({
			status: 404,
			message: `You have checked in with no booking ${order_id}`
		})
	}

	sendgridMail.send(tempMailCheckin(order_id, email, dateFormat(new Date()).format()), async (error, response) => {
		if (error) throw error
		await knex('bookings').where({ order_id: order_id }).update({ check_in_time: new Date(), update_at: new Date() })
		if (response[0].statusCode === 202) return
	})

	return { message: 'Check in room successfuly' }
}
