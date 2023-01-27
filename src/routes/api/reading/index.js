import express from 'express'
import books from './books/routes.js'
import all from './user/all/route.js'
import createTable from './user/create-table/route.js'
import deleteTable from './user/delete-table/route.js'
import login from './user/login/route.js'
import register from './user/register/route.js'
import user from './user/user/route.js'
const app = express()

// user routes
app.use('/user', user)
app.use('/user', register)
app.use('/user', all)
app.use('/user', createTable)
app.use('/user', deleteTable)
app.use('/user', login)

// book routes
app.use('/books', books)

export default app
