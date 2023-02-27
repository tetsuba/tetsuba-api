import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'
import { SQL__SELECT_TRACKER } from '../tracker/handler.js'
import { responseGetBooks } from '../../book/book/handler.js'
import { updateTrackerData } from '../../reading.utils.js'

const SQL__UPDATE = `
    UPDATE ${tableName('tracker')} SET data=? WHERE userId = ?
`

export default function updateTrackerHandler(req, res) {
    const errors = validate(SCHEMA, req.body)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        const db = res.sqlite
        db.get(SQL__SELECT_TRACKER, [res.user.id], function callback(err, row) {
            if (err)
                return res.status(500).json({
                    message: 'get tracker error',
                    error: err
                })

            const data = updateTrackerData(row.data, req.body)
            const PARAMS = [JSON.stringify(data), req.body.userId]
            res.sqlite.run(SQL__UPDATE, PARAMS, function callback(err) {
                if (err)
                    return res.status(500).json({
                        message: 'update tracker error',
                        error: err
                    })
                responseGetBooks(res.sqlite, res, req.body.userId)
            })
        })
    }
}
