import 'dotenv/config'
import { bodyParserGraphQL } from 'body-parser-graphql'
import { graphqlUploadExpress } from 'graphql-upload'
import zlib from 'zlib'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { bookingTimeCronjob } from './middleware.cronjob'
import { authJwt } from './middleware.auth'
import { authRole } from './middleware.role'

module.exports = (app) => {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParserGraphQL())
	app.use(cors())
	app.use(helmet({ contentSecurityPolicy: false }))
	app.use(compression({ level: 9, strategy: zlib.constants.Z_RLE }))
	app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 5 }))
	app.use(authJwt())
	app.use(authRole())
	app.use(bookingTimeCronjob())
	if (process.env.NODE_ENV !== 'production') {
		app.use(morgan('dev'))
	}
}
