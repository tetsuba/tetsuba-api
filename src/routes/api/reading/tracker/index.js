import express from 'express'
const app = express()

import createTable from './create-table/route.js'
import deleteTable from './delete-table/route.js'
import tracker from './tracker/route.js'
import add from './add/route.js'
import update from './update/route.js'
import words from './words/route.js'

app.use('/tracker', createTable)
app.use('/tracker', deleteTable)
app.use('/tracker', tracker)
app.use('/tracker', add)
app.use('/tracker', tracker)
app.use('/tracker', update)
app.use('/tracker', words)

export default app
