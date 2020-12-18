import bcryptjs from 'bcryptjs'

export const hashPassword = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

export const verifyPassword = (password, hashPassword) => bcryptjs.compareSync(password, hashPassword)
