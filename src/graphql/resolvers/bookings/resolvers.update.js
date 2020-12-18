import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const bookingsUpdate = async (_, { id, input }, { isAuthRole }) => {
	if (!isAuthRole) {
		throw errorMessage({
			status: 403,
			message: 'Forbidden admin area cannot access this API'
		})
	}

	const { user_id, room_id, total_person, booking_time, noted } = input
	const booking = await knex('bookings').where({ booking_id: id }).select()

	if (booking.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Booking item is not exists or deleted from owner'
		})
	}

	const updateUser = await knex('bookings')
		.where({ booking_id: id })
		.update({
			user_id,
			room_id,
			total_person,
			booking_time: new Date(booking_time),
			noted,
			update_at: new Date()
		})

	if (updateUser < 1) {
		throw errorMessage({
			status: 400,
			message: 'Booking item failed to updated'
		})
	}

	return { message: 'Booking item success to updated' }
}
