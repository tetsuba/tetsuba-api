import express from 'express'
const app = express()

import createTable from './create-table/route.js'
import deleteTable from './delete-table/route.js'
// import all from './all/route.js'
// import register from './register/route.js'
// import book from './user/route.js'

// app.use('/book', book)
// app.use('/book', register)
// app.use('/book', all)
app.use('/book', createTable)
app.use('/book', deleteTable)

export default app
