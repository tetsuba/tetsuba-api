import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

// SCHEMAS
import book from './schemas/book.js'
import user from './schemas/user.js'
import unauthorized from './schemas/unauthorized.js'
import badrequest from './schemas/badrequest.js'
import internalserver from './schemas/internalserver.js'
import word from './schemas/word.js'
import tracker from './schemas/tracker.js'
import collection from './schemas/collection.js'
import history from './schemas/history.js'
import student from './schemas/student.js'

const Router = express.Router()
const port = process.env.PORT || 3001

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tetsuba API',
            version: '1.0.0'
        },
        components: {
            schemas: {
                book,
                user,
                unauthorized,
                badrequest,
                internalserver,
                word,
                tracker,
                collection,
                history,
                student
            }
        },
        servers: [
            {
                url: 'http://localhost:' + port,
                description: 'Tetsuba API'
            }
        ]
    },
    apis: ['./src/routes/api/reading/**/**/route.js'] // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)

Router.use('/api-docs', swaggerUi.serve)
Router.get('/api-docs', swaggerUi.setup(openapiSpecification))

export default Router
