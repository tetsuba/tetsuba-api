import express from 'express'
import user from './api/reading/user/index.js'
import book from './api/reading/book/index.js'
import apiDocs from './docs/index.js'
import bodyParser from 'body-parser'
import { protectRoutes } from '../middleware/auth.js'
import sqlite from '../database/index.js'
import cors from 'cors'

const app = express()

const whitelist = ['http://localhost:3001/api-docs', 'http://127.0.0.1:5173']
// TODO: This will be removed after development
const ngrokDomain = '.eu.ngrok.io'
const corsOptions = {
    origin: function (origin, callback) {
        if (
            !origin ||
            whitelist.indexOf(origin) !== -1 ||
            origin.includes(ngrokDomain)
        ) {
            callback(null, true)
        } else {
            console.log('[origin]: ', origin)
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(sqlite)
app.use(protectRoutes)

/* Routes
 */
app.use('/api/reading', user)
app.use('/api/reading', book)

/* API Documentation (Swagger)
 *
 * NOTE: Not to be included for testing
 *  */
/* istanbul ignore next */
if (!(process.env.NODE_ENV === 'test')) {
    app.use(apiDocs)
}

export default app
