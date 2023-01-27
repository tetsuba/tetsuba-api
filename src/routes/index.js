import express from 'express'
import reading from './api/reading/index.js'
import apiDocs from './docs/index.js'
import bodyParser from 'body-parser'
import { protectRoutes } from '../middleware/auth.js'
import sqlite from '../database/index.js'
import cors from 'cors'

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(sqlite)
app.use(protectRoutes)

/* Routes
 */
app.use('/api/reading', reading)

/* API Documentation (Swagger)
 *
 * NOTE: Not to be included for testing
 *  */
/* istanbul ignore next */
if (!(process.env.NODE_ENV === 'test')) {
    app.use(apiDocs)
}

export default app
