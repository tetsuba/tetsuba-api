import { getValuesFrom, tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import REGISTER_BOOK_SCHEMA from './schema.js'

const SQL__INSERT_INTO_BOOK = `
    INSERT INTO ${tableName(
        'book'
    )}(userId, title, story, difficulty) values (?,?,?,?)
`

export default function registerBookHandler(req, res) {
    const errors = validate(REGISTER_BOOK_SCHEMA, req.body)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: errors })
    } else {
        res.sqlite.run(
            SQL__INSERT_INTO_BOOK,
            getValuesFrom(req.body),
            function callback(err) {
                if (err) {
                    res.status(500) // Internal Server Error
                        .json({ error: err.message })
                } else {
                    res.status(201) // Created
                        .json({ success: 'Book registered!' })
                }
            }
        )
    }
}
