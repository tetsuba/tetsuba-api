import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'
import { SQL__SELECT_TRACKER } from '../tracker/handler.js'
import { responseGetBooks } from '../../book/book/handler.js'
import { updateTrackerData } from '../../reading.utils.js'

const SQL__UPDATE = `
    UPDATE ${tableName('tracker')} SET data=? WHERE userId = ?
`

export default function updateTrackerHandler(req, res, next) {
    const errors = validate(SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const db = res.sqlite
        db.get(
            SQL__SELECT_TRACKER,
            [res.user.id],
            function callback(error, row) {
                if (error) {
                    next({ status: 500, stack: error })
                } else {
                    const data = updateTrackerData(row.data, req.body)
                    const PARAMS = [JSON.stringify(data), req.body.userId]
                    res.sqlite.run(SQL__UPDATE, PARAMS, function callback(err) {
                        if (err) {
                            next({ status: 500, stack: err })
                        } else {
                            responseGetBooks(
                                res.sqlite,
                                res,
                                req.body.userId,
                                false,
                                next
                            )
                        }
                    })
                }
            }
        )
    }
}
