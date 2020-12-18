import knex from '../../../databases'
import sendgridMail from '@sendgrid/mail'
sendgridMail.setApiKey(process.env.SG_SECRET)
import { tempMailBooking } from '../../../templates/template.booking'
import { orderId } from '../../../utils/util.orderId'
import { errorMessage } from '../../../utils/util.errorMessage'

export const bookingsCreate = async (_, { input }, { isAuthJwt }) => {
	if (!isAuthJwt) {
		throw errorMessage({
			status: 401,
			message: 'Unauthorization access token expired or invalid'
		})
	}

	const { user_id, room_id, total_person, booking_time, noted } = input
	const findRoom = await knex('rooms').where({ room_id: room_id }).select(['room_capacity', 'room_status'])
	const findUser = await knex('users').where({ user_id }).select('email')

	if (findUser.length < 1 || findRoom.length < 1) {
		throw errorMessage({
			status: 400,
			message: 'user_id/room_id not found or deleted from owner'
		})
	}

	if (total_person >= findRoom[0].room_capacity) {
		throw errorMessage({
			status: 400,
			message: `Maximum capacity must be under ${findRoom[0].room_capacity}`
		})
	}

	if (findRoom[0].room_status === 'booked') {
		throw errorMessage({
			status: 400,
			message: 'Room already booked, please contact customer service for more information'
		})
	}

	const orderBooking = await knex('bookings').insert(
		{
			order_id: orderId(),
			user_id,
			room_id,
			total_person,
			booking_time: new Date(booking_time),
			noted,
			created_at: new Date()
		},
		'order_id'
	)

	if (orderBooking.rowCount < 1) {
		throw errorMessage({
			status: 400,
			message: 'Order booking room failed'
		})
	}

	const messageMail = tempMailBooking(orderBooking[0], findUser[0].email)
	sendgridMail.send(messageMail, async (error, response) => {
		if (error) throw error
		if (response[0].statusCode === 202) {
			await knex('rooms').where({ room_id: room_id }).update({ room_status: 'booked', updated_at: new Date() })
			return
		}
	})

	return { message: 'Order booking room successfuly, please check your email' }
}
