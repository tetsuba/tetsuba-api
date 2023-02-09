import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_SCHEMA from './schema.js'

export const SQL__SELECT_BOOKS = `
  SELECT * FROM ${tableName('book')} WHERE userId = ?
`

export default function getBookHandler(req, res) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(BOOK_SCHEMA, req.query)
    const PARAMS = [req.query.userId]
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: errors })
    } else {
        res.sqlite.all(SQL__SELECT_BOOKS, PARAMS, function callback(err, rows) {
            console.log(err)
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(rows)
        })
    }
}
