import express from 'express'
import reading from './api/reading/index.js'
import apiDocs from './docs/index.js'
const app = express()

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
