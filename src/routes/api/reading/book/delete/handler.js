import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_DELETE_SCHEMA from './schema.js'
import { responseGetBooks } from '../book/handler.js'

export const SQL__DELETE_BOOK = `
  DELETE FROM ${tableName('book')} WHERE id = ?
`

export default function deleteBookHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.bookId = +req.query.bookId
    // *****************************************************
    const errors = validate(BOOK_DELETE_SCHEMA, req.query)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const PARAMS = [req.query.bookId]

        res.sqlite.run(SQL__DELETE_BOOK, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                responseGetBooks(res.sqlite, res, res.user.id, false, next)
            }
        })
    }
}
