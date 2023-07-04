import validate from '../../../../../validator.js'
import BOOK_SCHEMA from './schema.js'
import { SQL__SELECT_BOOKS } from '../../book/book/handler.js'
import { getSightWordsData } from '../../reading.utils.js'
import { SQL__SELECT_TRACKER } from '../../tracker/tracker/handler.js'

export default function getSightWordsHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(BOOK_SCHEMA, req.query)
    const PARAMS = [req.query.userId]
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        res.sqlite.all(SQL__SELECT_BOOKS, PARAMS, function callback(err, rows) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                res.sqlite.get(
                    SQL__SELECT_TRACKER,
                    PARAMS,
                    function callback(err, row) {
                        if (err) {
                            next({ status: 500, stack: err })
                        } else {
                            res.status(200).json(
                                getSightWordsData(rows, row.data)
                            )
                        }
                    }
                )
            }
        })
    }
}
