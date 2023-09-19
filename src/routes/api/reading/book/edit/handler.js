import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import EDIT_BOOK_SCHEMA from './schema.js'

const SQL__UPDATE_BOOK = `
    UPDATE ${tableName('book')} SET title=?, story=? WHERE id = ?
`

export default function editBookHandler(req, res, next) {
    const errors = validate(EDIT_BOOK_SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const { id, story, title } = req.body
        const PARAMS = [title, story, id]
        res.sqlite.run(SQL__UPDATE_BOOK, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                res.status(200) // Created
                    .json({ message: 'Book updated' })
            }
        })
    }
}
