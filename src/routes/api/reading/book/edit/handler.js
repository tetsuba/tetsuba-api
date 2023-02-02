import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import EDIT_BOOK_SCHEMA from './schema.js'

const SQL__UPDATE_BOOK = `
    UPDATE ${tableName(
        'book'
    )} SET title=?,  story=?,  difficulty=? WHERE id = ?
`

export default function editBookHandler(req, res) {
    const errors = validate(EDIT_BOOK_SCHEMA, req.body)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: errors })
    } else {
        const { id, story, title, difficulty } = req.body
        const PARAMS = [title, story, difficulty, id]
        res.sqlite.run(SQL__UPDATE_BOOK, PARAMS, function callback(err) {
            if (err) {
                res.status(500) // Internal Server Error
                    .json({ error: err.message })
            } else {
                res.status(200) // Created
                    .json({ message: 'Book updated' })
            }
        })
    }
}
