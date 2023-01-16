import express from 'express'
import user from './user/routes.js'
import books from './books/routes.js'
const app = express()

// routes
app.use('/user', user)
app.use('/books', books)

export default app
