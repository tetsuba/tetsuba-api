import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// ROUTES
import user from './api/reading/user/index.js'
import book from './api/reading/book/index.js'
import sightWords from './api/reading/sightWords/index.js'
import tracker from './api/reading/tracker/index.js'
import student from './api/reading/student/index.js'

// DOCS
import apiDocs from './docs/index.js'

// MIDDLEWARE
import { protectRoutes } from '../middleware/auth.js'
import errorHandler from '../middleware/errorHandler.js'

// DATABASE
import sqlite from '../database/index.js'

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(sqlite)
app.use(protectRoutes)

/* Routes
 */
app.use('/api/reading', user)
app.use('/api/reading', book)
app.use('/api/reading', sightWords)
app.use('/api/reading', tracker)
app.use('/api/reading', student)

/* Error Handler
 * This middleware must be set at the end of the routes to work.
 */
app.use(errorHandler)

/* API Documentation (Swagger)
 *
 * NOTE: Not to be included for testing
 *  */
/* istanbul ignore next */
if (!(process.env.NODE_ENV === 'test')) {
    app.use(apiDocs)
}

export default app
