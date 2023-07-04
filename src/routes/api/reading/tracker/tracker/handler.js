import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'
export const SQL__SELECT_TRACKER = `
  SELECT * FROM ${tableName('tracker')} WHERE userId = ?
`
export default function getTrackerHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(SCHEMA, req.query)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        res.sqlite.get(
            SQL__SELECT_TRACKER,
            [req.query.userId],
            function callback(err, row) {
                if (err) {
                    next({ status: 500, stack: err })
                } else {
                    res.status(200).json(row)
                }
            }
        )
    }
}
