import express from 'express'
const app = express()

import createTable from './create-table/route.js'
import deleteTable from './delete-table/route.js'
import all from './all/route.js'
import register from './register/route.js'
import book from './book/route.js'
import deleteBook from './delete/route.js'
import editBook from './edit/route.js'
import updateBook from './update/route.js'
import words from './words/route.js'

app.use('/book', book)
app.use('/book', all)
app.use('/book', register)
app.use('/book', createTable)
app.use('/book', deleteTable)
app.use('/book', deleteBook)
app.use('/book', editBook)
app.use('/book', updateBook)
app.use('/book', words)

export default app
