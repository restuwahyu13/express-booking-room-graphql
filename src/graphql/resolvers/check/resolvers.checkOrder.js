import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const checkOrder = async (_, { id }) => {
	const booking = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.join('rooms', 'bookings.room_id', 'rooms.room_id')
		.where({ 'bookings.order_id': id })
		.select([
			'bookings.order_id',
			'bookings.total_person',
			'bookings.booking_time',
			'users.email',
			'rooms.room_name',
			'rooms.room_capacity',
			'rooms.photo as photoRoom',
			'rooms.room_status'
		])

	if (booking.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Detail booking information is not exists'
		})
	}

	const { order_id, total_person, booking_time, email, room_name, room_capacity, photoRoom, room_status } = booking[0]

	return {
		message: 'Your detail booking order information',
		detailOrder: { order_id, total_person, booking_time, email, room_name, photoRoom, room_status, room_capacity }
	}
}
