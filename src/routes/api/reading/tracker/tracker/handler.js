import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'
export const SQL__SELECT_TRACKER = `
  SELECT * FROM ${tableName('tracker')} WHERE userId = ?
`
export default function getTrackerHandler(req, res) {
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
                res.status(200).json(row)
            }
        )
    }
}
