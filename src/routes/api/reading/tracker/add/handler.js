import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'

export const SQL__INSERT_INTO_TRACKER = `
    INSERT INTO ${tableName('tracker')}(userId) values (?)
`
export default function addTrackerHandler(req, res) {
    const db = res.sqlite
    const errors = validate(SCHEMA, req.body)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        db.run(
            SQL__INSERT_INTO_TRACKER,
            [req.body.userId],
            function callback(err) {
                if (err) {
                    res.status(500).json({ message: err.message })
                    return null
                }
                res.status(201).json({ message: 'New Tracker Added' })
            }
        )
    }
}
