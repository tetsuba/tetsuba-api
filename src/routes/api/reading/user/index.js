import express from 'express'
const app = express()

import all from './all/route.js'
import createTable from './create-table/route.js'
import deleteTable from './delete-table/route.js'
import login from './login/route.js'
import register from './register/route.js'
import user from './user/route.js'

app.use('/user', user)
app.use('/user', register)
app.use('/user', all)
app.use('/user', createTable)
app.use('/user', deleteTable)
app.use('/user', login)

export default app
