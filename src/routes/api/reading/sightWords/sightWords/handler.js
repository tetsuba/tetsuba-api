import validate from '../../../../../validator.js'
import BOOK_SCHEMA from './schema.js'
import { SQL__SELECT_BOOKS } from '../../book/book/handler.js'
import { getSightWordsData } from '../../reading.utils.js'

export default function getSightWordsHandler(req, res) {
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
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(getSightWordsData(rows))
        })
    }
}
