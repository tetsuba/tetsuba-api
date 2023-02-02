import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_DELETE_SCHEMA from './schema.js'

export const SQL__DELETE_BOOK = `
  DELETE FROM ${tableName('book')} WHERE id = ?
`

export default function deleteBookHandler(req, res) {
    const errors = validate(BOOK_DELETE_SCHEMA, req.body)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        const PARAMS = [req.body.id]

        res.sqlite.run(SQL__DELETE_BOOK, PARAMS, function callback(err) {
            console.log(err)
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json({ message: 'Book deleted' })
        })
    }
}
