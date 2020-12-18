import { gql } from 'apollo-server-express'

export default gql(`

	 scalar Upload
	 scalar Date

	 type Query {
			usersActivation(params: UsersInputActivation! ) : UsersActivation!
			adminsResults: AdminsResults!
			adminsResult(id: ID!): AdminsResult!
			roomsResults: RoomsResults!
			roomsResult(id: ID!): RoomsResult!
			bookingsResults: BookingsResults!
			bookingsResult(id: ID!): BookingsResult!
			checkOrder(id: ID!): CheckOrder
			checkIn(id: ID!): CheckIn
			checkOut(id: ID!): CheckOut
	 }

		type Mutation {
			usersRegister(input: UsersInputRegister!, photo: Upload! ): UsersRegister!
			usersLogin(input: UsersInputLogin!): UsersLogin!
			usersResend(input: UsersInputResend!): UsersResend!
			adminsCreate(input: AdminsInputCreate!, photo: Upload! ): AdminsCreate!
			adminsDelete(id: ID!): AdminsDelete
			adminsUpdate(id: ID!, input: AdminsInputUpdate!, photo: Upload! ): AdminsUpdate!
			roomsCreate(input: RoomsInputCreate!, photo: Upload! ): RoomsCreate!
			roomsDelete(id: ID!): RoomsDelete
			roomsUpdate(id: ID!, input: RoomsInputUpdate!, photo: Upload! ): RoomsUpdate!
			bookingsCreate(input: BookingsInputCreate!): BookingsCreate!
			bookingsDelete(id: ID!): BookingsDelete
			bookingsUpdate(id: ID!, input: BookingsInputUpdate!): BookingsUpdate!
		}

		input UsersInputRegister {
			email: String!
			password: String!
		}

		input UsersInputLogin {
			email: String!
			password: String!
		}

		input UsersInputActivation {
			 token: String!
		}

		input UsersInputResend {
			 email: String!
		}

		type UsersRegister {
			message: String!
		}

		type UsersLogin {
			message: String!
			access_token: String!
		}

		type UsersActivation {
			message: String!
		}

		type UsersResend {
			message: String!
		}

		input AdminsInputCreate {
			email: String!
			password: String!
		}

		input AdminsInputUpdate {
			email: String!
			password: String!
			role: String
			active: Int
		}

		type AdminsCreate {
			message: String!
		}

		type AdminsResultsType {
			user_id: ID!
			email: String!
			password: String!
			photo: String!
			role: String!
			active: Int!
			created_at: Date!
		}

		type AdminsResults {
			message: String!
			users: [AdminsResultsType!]!
		}

		type AdminsResultType {
			user_id: ID!
			email: String!
			password: String!
			photo: String!
			role: String!
			active: Int!
			created_at: Date!
		}

		type AdminsResult {
			message: String!
			user: AdminsResultType!
		}

		type AdminsDelete {
			message: String!
		}

		type AdminsUpdate {
			message: String!
		}

		input RoomsInputCreate {
			room_name: String!
			room_capacity: Int!
		}

		input RoomsInputUpdate {
			room_name: String!
			room_capacity: Int!
		}

		type RoomsCreate {
			message: String!
		}

		type RoomsResultsType {
			room_id: ID!
			room_name: String!
			room_capacity: String!
			photo: String!
			room_status: String!
			created_at: Date!
		}

		type RoomsResults {
			message: String!
			rooms: [RoomsResultsType!]!
		}

		type RoomsResultType {
			room_id: ID!
			room_name: String!
			room_capacity: String!
			photo: String!
			room_status: String!
			created_at: Date!
		}

		type RoomsResult {
			message: String!
			room: RoomsResultType!
		}

		type RoomsDelete {
			message: String!
		}

		type RoomsUpdate {
			message: String!
		}

		input BookingsInputCreate {
			user_id: ID!
			room_id: ID!
			total_person: Int!
			booking_time: Date!
			noted: String!
		}

		input BookingsInputUpdate {
			user_id: ID!
			room_id: ID!
			total_person: Int!
			booking_time: Date!
			noted: String!
		}

		type BookingsCreate {
			message: String!
		}

		type BookingsResultsType {
			order_id: ID!
			user_id: ID!
			room_id: ID!
			total_person: Int!
			booking_time: Date!
			noted: String!
			email: String!
			photoUsers: String!
			active: String!
			room_name: String!
			room_capacity: Int!
			photoRooms: String!
			room_status: String!
		}

		type BookingsResults {
			message: String!
			bookings: [BookingsResultsType!]!
		}

		type BookingsResultTypeBookings {
			order_id: ID!
			user_id: ID!
			room_id: ID!
			total_person: Int!
			booking_time: Date!
			noted: String!
		}

		type BookingsResultTypeUsers {
			email: String!
			photoUsers: String!
			active: Int!
		}

		type BookingsResultTypeRooms {
			room_name: String!
			room_capacity: Int!
			photoRooms: String!
			room_status: String!
		}

		type BookingsResult {
			message: String!
			booking: BookingsResultTypeBookings!
			user: BookingsResultTypeUsers!
			room: BookingsResultTypeRooms!
		}

		type BookingsDelete {
			message: String!
		}

		type BookingsUpdate {
			message: String!
		}

		type CheckOrderType {
			order_id: ID!
			total_person: Int!
			booking_time: Date!
			email: String!
			room_name: String!
			photoRoom: String!
			room_status: String!
			room_capacity: Int!
		}

		type CheckOrder {
			message: String!
			detailOrder: CheckOrderType!
		}

		type CheckIn {
			message: String!
		}

		type CheckOut {
			message: String!
		}

	`)
