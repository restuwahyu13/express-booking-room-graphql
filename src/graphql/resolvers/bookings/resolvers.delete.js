import knex from '../../../databases'
import { errorMessage } from '../../../utils/util.errorMessage'

export const bookingsDelete = async (_, { id }) => {
	const findBooking = await knex('bookings').where({ booking_id: id }).select()

	if (findBooking.length < 1) {
		throw errorMessage({
			status: 404,
			message: 'Booking item is not exists or deleted from owner'
		})
	}

	await knex('rooms')
		.where({ room_id: findBooking[0].room_id })
		.update({ room_status: 'ready', updated_at: new Date() })

	const deleteBooking = await knex('bookings').where({ booking_id: id }).delete()

	if (deleteBooking < 1) {
		throw errorMessage({
			status: 400,
			message: 'Booking item failed to deleted'
		})
	}

	return { message: 'Booking item success to deleted' }
}
