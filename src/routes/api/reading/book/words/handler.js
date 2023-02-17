import validate from '../../../../../validator.js'
import BOOK_SCHEMA from './schema.js'
import { SQL__SELECT_BOOKS } from '../book/handler.js'

export default function getWordsHandler(req, res) {
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
            const words = rows
                .filter((book) => book.history)
                .map((book) => JSON.parse(book.history))
                .map((history) => history.map(({ words }) => words))
                .flat()
                .flat()
                .reduce((acc, word) => {
                    const update = acc.some((obj) => obj.word === word)
                    if (update) {
                        acc.forEach((obj, i) => {
                            if (obj.word === word) {
                                acc[i] = { ...obj, index: obj.index + 1 }
                            }
                        })
                    } else {
                        acc.push({ word, index: 1 })
                    }
                    return acc
                }, [])
            res.status(200).json(words)
        })
    }
}
