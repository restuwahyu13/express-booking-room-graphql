import knex from '../../../databases'
import sendgridMail from '@sendgrid/mail'
sendgridMail.setApiKey(process.env.SG_SECRET)
import { tempMailCheckOut } from '../../../templates/template.checkOut'
import { dateFormat } from '../../../utils/util.dateFormat'
import { errorMessage } from '../../../utils/util.errorMessage'

export const checkOut = async (_, { id }) => {
	const checkIn = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.where({ 'bookings.order_id': id })
		.select(['bookings.order_id', 'bookings.room_id', 'bookings.check_out_time', 'users.email'])

	const { order_id, room_id, check_out_time, email } = checkIn[0]

	if (checkIn.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Check out room failed order_id is not exists'
		})
	}

	if (check_out_time !== null) {
		throw errorMessage({
			status: 404,
			message: `You have checked out with no booking ${order_id}`
		})
	}

	sendgridMail.send(tempMailCheckOut(order_id, email, dateFormat(new Date()).format()), async (error, response) => {
		if (error) throw error
		await knex('bookings').where({ order_id: order_id }).update({ check_out_time: new Date(), update_at: new Date() })
		await knex('rooms').where({ room_id: room_id }).update({ room_status: 'ready', updated_at: new Date() })
		if (response[0].statusCode === 202) return
	})

	return { message: 'Check out room successfuly' }
}
