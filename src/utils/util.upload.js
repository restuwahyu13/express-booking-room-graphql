import { resolve } from 'path'
import { createWriteStream, existsSync, unlink } from 'fs'

const uploadFile = ({ filename, stream }) => {
	stream
		.pipe(createWriteStream(resolve(process.cwd(), `src/images/${filename}`)))
		.on('finish', () => Promise.resolve())
		.on('error', Promise.reject)
}

const validateFile = ({ filename, stream }) => {
	const extFile = filename.replace('.', '')
	const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile)
	if (!extPattern) throw new TypeError('Image format is not valid')

	const fileExits = existsSync(resolve(process.cwd(), `src/images/${filename}`))
	if (!fileExits) return uploadFile({ filename, stream })

	unlink(resolve(process.cwd(), `src/images/${filename}`), (error) => {
		if (error) throw error
		return uploadFile({ filename, stream })
	})
}

export const fileUpload = ({ filename, stream }) =>
	filename ? validateFile({ filename, stream }) : new Error('Image is required')
