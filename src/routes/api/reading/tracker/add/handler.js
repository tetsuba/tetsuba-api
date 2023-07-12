import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'

export const SQL__INSERT_INTO_TRACKER = `
    INSERT INTO ${tableName('tracker')}(userId) values (?)
`
export default function addTrackerHandler(req, res, next) {
    const db = res.sqlite
    const errors = validate(SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        db.run(
            SQL__INSERT_INTO_TRACKER,
            [req.body.userId],
            function callback(err) {
                if (err) {
                    next({ status: 500, stack: err })
                } else {
                    res.status(201).json({ message: 'New Tracker Added' })
                }
            }
        )
    }
}
