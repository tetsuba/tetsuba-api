import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const Router = express.Router()
const port = process.env.PORT || 3001

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tetsuba API',
            version: '1.0.0'
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
