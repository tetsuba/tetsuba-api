import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_DELETE_SCHEMA from './schema.js'
import { responseGetBooks } from '../book/handler.js'

export const SQL__DELETE_BOOK = `
  DELETE FROM ${tableName('book')} WHERE id = ?
`

export default function deleteBookHandler(req, res) {
    // This is a hack to convert the userId to be an integer.
    req.query.bookId = +req.query.bookId
    // *****************************************************
    const errors = validate(BOOK_DELETE_SCHEMA, req.query)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        const PARAMS = [req.query.bookId]

        res.sqlite.run(SQL__DELETE_BOOK, PARAMS, function callback(err) {
            if (err)
                return res.status(500).json({
                    message: 'delete book error',
                    error: err
                })
            responseGetBooks(res.sqlite, res, res.user.id)
        })
    }
}
