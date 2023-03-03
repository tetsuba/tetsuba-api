import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'
import {
    countTrackerWords,
    getBookTitle,
    getLastBookRead
} from '../../reading.utils.js'
import library from '../../../../../database/static/library.js'
import { SQL__SELECT_BOOKS } from '../../book/book/handler.js'
export const SQL__SELECT_TRACKER = `
  SELECT * FROM ${tableName('tracker')} WHERE userId = ?
`
export default function getWordsFromTrackerHandler(req, res) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(SCHEMA, req.query)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        res.sqlite.get(
            SQL__SELECT_TRACKER,
            [req.query.userId],
            function callback(err, row) {
                if (err)
                    return res.status(500).json({
                        message: 'get tracker error',
                        error: err
                    })
                const words = countTrackerWords(row)
                const lastBookRead = getLastBookRead(row)

                res.sqlite.all(
                    SQL__SELECT_BOOKS,
                    [req.query.userId],
                    function (err, rows) {
                        if (err)
                            return res.status(500).json({
                                message: 'get books error',
                                error: err
                            })

                        library[0].books = rows

                        const lastBookReadWithTitle = getBookTitle(
                            lastBookRead,
                            library
                        )

                        res.status(200).json({
                            readIncorrectly: words,
                            lastBookRead: lastBookReadWithTitle
                        })
                    }
                )
            }
        )
    }
}
