import express from 'express'
import books from './books/routes.js'
import all from './user/all/route.js'
import createTable from './user/create-table/route.js'
import deleteTable from './user/delete-table/route.js'
import login from './user/login/route.js'
import register from './user/register/route.js'
const app = express()

// user routes
app.use('/user', all)
app.use('/user', createTable)
app.use('/user', deleteTable)
app.use('/user', login)
app.use('/user', register)

// book routes
app.use('/books', books)

export default app
