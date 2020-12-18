import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const bookingsResult = async (_, { id }, { isAuthRole }) => {
	if (!isAuthRole) {
		throw errorMessage({
			status: 403,
			message: 'Forbidden admin area cannot access this API'
		})
	}

	const booking = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.join('rooms', 'bookings.room_id', 'rooms.room_id')
		.where({ 'bookings.booking_id': id })
		.select([
			'bookings.order_id',
			'bookings.user_id',
			'bookings.room_id',
			'bookings.total_person',
			'bookings.booking_time',
			'bookings.noted',
			'users.email',
			'users.photo as photoUsers',
			'users.active',
			'rooms.room_name',
			'rooms.room_capacity',
			'rooms.photo as photoRooms',
			'rooms.room_status'
		])

	if (booking.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Data is not exists or deleted from owner'
		})
	}

	const {
		order_id,
		user_id,
		room_id,
		total_person,
		booking_time,
		noted,
		email,
		photoUsers,
		active,
		room_name,
		room_capacity,
		photoRooms,
		room_status
	} = booking[0]

	return {
		message: 'Data already to use',
		booking: { order_id, user_id, room_id, total_person, booking_time, noted },
		user: { email, photoUsers, active },
		room: { room_name, room_capacity, photoRooms, room_status }
	}
}
