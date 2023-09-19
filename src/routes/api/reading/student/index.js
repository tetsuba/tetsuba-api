import express from 'express'
const app = express()

import createTable from './create-table/route.js'
import deleteTable from './delete-table/route.js'
import students from './students/route.js'
import register from './register/route.js'
import deleteStudent from './delete/route.js'
import updateStudent from './update/route.js'

app.use('/student', createTable)
app.use('/student', deleteTable)
app.use('/student', register)
app.use('/student', students)
app.use('/student', deleteStudent)
app.use('/student', updateStudent)

export default app
