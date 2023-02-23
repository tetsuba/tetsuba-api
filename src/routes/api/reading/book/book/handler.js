import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_SCHEMA from './schema.js'
import library from '../../../../../database/static/library.js'
import { SQL__SELECT_TRACKER } from '../../tracker/tracker/handler.js'
import { updateWithTrackingData } from '../../reading.utils.js'

export const SQL__SELECT_BOOKS = `
  SELECT * FROM ${tableName('book')} WHERE userId = ?
`

export function responseGetBooks(db, res, userId, status) {
    db.all(SQL__SELECT_BOOKS, [userId], function (err, rows) {
        if (err)
            return res.status(500).json({
                message: 'get books error',
                error: err
            })

        library[0].books = rows

        db.get(SQL__SELECT_TRACKER, [userId], function (err, row) {
            if (err)
                return res.status(500).json({
                    message: 'get tracker error',
                    error: err
                })

            const tracker = row.data ? JSON.parse(row.data) : []
            const updatedLibrary = updateWithTrackingData(library, tracker)
            res.status(status || 200).json(updatedLibrary)
        })
    })
}

export default function getBookHandler(req, res) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(BOOK_SCHEMA, req.query)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        responseGetBooks(res.sqlite, res, req.query.userId)
    }
}
