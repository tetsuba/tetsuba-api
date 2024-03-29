import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_SCHEMA from './schema.js'
import library from '../../../../../database/static/library.js'
import { SQL__SELECT_TRACKER } from '../../tracker/tracker/handler.js'
import { updateWithTrackingData } from '../../reading.utils.js'

export const SQL__SELECT_BOOKS = `
  SELECT * FROM ${tableName('book')} WHERE userId = ?
`

export function responseGetBooks(db, res, userId, status, next) {
    db.all(SQL__SELECT_BOOKS, [userId], function (error, rows) {
        if (error) {
            next({ status: 500, stack: error })
        } else {
            library[0].books = rows.map((book) => {
                // TODO: remove ternary operator when all stories are an array
                return {
                    ...book,
                    story: book.story.match(/\[/)
                        ? JSON.parse(book.story)
                        : book.story
                }
            })

            db.get(SQL__SELECT_TRACKER, [userId], function (err, row) {
                if (err) {
                    next({ status: 500, stack: err })
                } else {
                    const tracker = row.data ? JSON.parse(row.data) : []
                    const updatedLibrary = updateWithTrackingData(
                        library,
                        tracker
                    )
                    res.status(status || 200).json(updatedLibrary)
                }
            })
        }
    })
}

export default function getBookHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(BOOK_SCHEMA, req.query)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        responseGetBooks(res.sqlite, res, req.query.userId, false, next)
    }
}
