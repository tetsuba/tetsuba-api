import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import REGISTER_BOOK_SCHEMA from './schema.js'
import { responseGetBooks } from '../book/handler.js'

const SQL__INSERT_INTO_BOOK = `
    INSERT INTO ${tableName('book')}(userId, title, story) values (?,?,?)
`

export default function registerBookHandler(req, res, next) {
    const db = res.sqlite
    const errors = validate(REGISTER_BOOK_SCHEMA, req.body)
    console.log('Register Book', errors)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const PARAMS = [
            req.body.userId,
            req.body.title,
            JSON.stringify(req.body.story)
        ]
        db.run(SQL__INSERT_INTO_BOOK, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                responseGetBooks(res.sqlite, res, req.body.userId, 201, next)
            }
        })
    }
}
