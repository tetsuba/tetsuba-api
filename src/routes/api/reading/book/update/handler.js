import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import EDIT_BOOK_SCHEMA from './schema.js'
import { SQL__SELECT_BOOKS } from '../book/handler.js'

const SQL__UPDATE_BOOK = `
    UPDATE ${tableName('book')} SET history=? WHERE id = ?
`

export default function updateBookHandler(req, res, next) {
    const errors = validate(EDIT_BOOK_SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const { id, history } = req.body
        const PARAMS = [history, id]
        res.sqlite.run(SQL__UPDATE_BOOK, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                res.sqlite.all(
                    SQL__SELECT_BOOKS,
                    [res.user.id],
                    function callback(err, rows) {
                        if (err) {
                            next({ status: 500, stack: err })
                        } else {
                            res.status(200).json(rows)
                        }
                    }
                )
            }
        })
    }
}
