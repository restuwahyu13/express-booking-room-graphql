import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const bookingsResults = async (_, args, { isAuthRole }) => {
	if (!isAuthRole) {
		throw errorMessage({
			status: 403,
			message: 'Forbidden admin area cannot access this API'
		})
	}

	const bookings = await knex('bookings')
		.join('users', 'bookings.user_id', 'users.user_id')
		.join('rooms', 'bookings.room_id', 'rooms.room_id')
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

	if (bookings.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Data is not exists or deleted from owner'
		})
	}

	return { message: 'Data already to use', bookings: bookings }
}
