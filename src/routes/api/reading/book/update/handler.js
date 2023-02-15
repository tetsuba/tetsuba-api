import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import EDIT_BOOK_SCHEMA from './schema.js'
import { SQL__SELECT_BOOKS } from '../book/handler.js'

const SQL__UPDATE_BOOK = `
    UPDATE ${tableName('book')} SET history=? WHERE id = ?
`

export default function updateBookHandler(req, res) {
    const errors = validate(EDIT_BOOK_SCHEMA, req.body)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: errors })
    } else {
        const { id, history } = req.body
        const PARAMS = [history, id]
        res.sqlite.run(SQL__UPDATE_BOOK, PARAMS, function callback(err) {
            if (err) {
                res.status(500).json({ error: err.message })
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
