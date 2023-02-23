import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import REGISTER_BOOK_SCHEMA from './schema.js'
import { responseGetBooks } from '../book/handler.js'

const SQL__INSERT_INTO_BOOK = `
    INSERT INTO ${tableName('book')}(userId, title, story) values (?,?,?)
`

export default function registerBookHandler(req, res) {
    const db = res.sqlite
    const errors = validate(REGISTER_BOOK_SCHEMA, req.body)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: errors })
    } else {
        const PARAMS = [req.body.userId, req.body.title, req.body.story]
        db.run(SQL__INSERT_INTO_BOOK, PARAMS, function callback(err) {
            if (err) {
                res.status(500).json({ message: err.message })
                return null
            }
            responseGetBooks(res.sqlite, res, req.body.userId, 201)
            // db.all(
            //     SQL__SELECT_BOOKS,
            //     [req.body.userId],
            //     function callback(err, rows) {
            //         if (err) {
            //             res.status(500).json({ message: err.message })
            //             return null
            //         }
            //         res.status(201).json(rows)
            //     }
            // )
        })
    }
}
