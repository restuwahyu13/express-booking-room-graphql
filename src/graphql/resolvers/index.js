import { usersRegister } from './users/resolvers.register'
import { usersLogin } from './users/resolvers.login'
import { usersActivation } from './users/resolvers.activation'
import { usersResend } from './users/resolver.resend'
import { adminsCreate } from './admins/resolvers.create'
import { adminsResults } from './admins/resolvers.results'
import { adminsResult } from './admins/resolvers.result'
import { adminsDelete } from './admins/resolvers.delete'
import { adminsUpdate } from './admins/resolvers.update'
import { roomsCreate } from './rooms/resolvers.create'
import { roomsResults } from './rooms/resolvers.results'
import { roomsResult } from './rooms/resolvers.result'
import { roomsDelete } from './rooms/resolvers.delete'
import { roomsUpdate } from './rooms/resolvers.update'
import { bookingsCreate } from './bookings/resolvers.create'
import { bookingsResults } from './bookings/resolvers.results'
import { bookingsResult } from './bookings/resolvers.result'
import { bookingsDelete } from './bookings/resolvers.delete'
import { bookingsUpdate } from './bookings/resolvers.update'
import { checkOrder } from './check/resolvers.checkOrder'
import { checkIn } from './check/resolvers.checkIn'
import { checkOut } from './check/resolvers.checkOut'

export default {
	Query: {
		usersActivation,
		adminsResults,
		adminsResult,
		roomsResults,
		roomsResult,
		bookingsResults,
		bookingsResult,
		checkOrder,
		checkIn,
		checkOut
	},
	Mutation: {
		usersRegister,
		usersLogin,
		usersResend,
		adminsCreate,
		adminsDelete,
		adminsUpdate,
		roomsCreate,
		roomsDelete,
		roomsUpdate,
		bookingsCreate,
		bookingsDelete,
		bookingsUpdate
	}
}
