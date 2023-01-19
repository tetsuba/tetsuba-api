import express from 'express'
import reading from './api/reading/index.js'
import apiDocs from './docs/index.js'
import bodyParser from 'body-parser'
import { protectRoutes } from '../middleware/auth.js'
const app = express()

//Middleware
app.use(bodyParser.json())

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

    // TODO: should protectRoutes be tested?
    app.use(protectRoutes)
}

export default app
