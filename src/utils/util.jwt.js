import jwt from 'jsonwebtoken'
import { Base64 } from 'js-base64'

export const encodedJwt = (data, options) => {
	const token = jwt.sign({ ...data }, process.env.JWT_SECRET, { ...options })
	return Base64.encode(token)
}

export const decodedJwt = (token) => {
	const decodeToken = Base64.decode(token)
	return jwt.verify(decodeToken, process.env.JWT_SECRET)
}
