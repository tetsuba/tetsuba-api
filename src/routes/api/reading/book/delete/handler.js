import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_DELETE_SCHEMA from './schema.js'
import { SQL__SELECT_BOOKS } from '../book/handler.js'

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
            if (err) {
                res.status(500).json({ message: err.message })
                return null
            }
            res.sqlite.all(
                SQL__SELECT_BOOKS,
                [res.user.id],
                function callback(err, rows) {
                    if (err) {
                        res.status(500).json({ message: err.message })
                        return null
                    }
                    res.status(200).json(rows)
                }
            )
        })
    }
}
