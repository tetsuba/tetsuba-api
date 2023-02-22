import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import SCHEMA from './schema.js'

const SQL__UPDATE = `
    UPDATE ${tableName('tracker')} SET data=? WHERE userId = ?
`

export default function updateTrackerHandler(req, res) {
    const errors = validate(SCHEMA, req.body)
    if (errors) {
        res.status(400).json({ error: errors })
    } else {
        const PARAMS = [req.body.data, req.body.userId]
        res.sqlite.run(SQL__UPDATE, PARAMS, function callback(err) {
            if (err) {
                res.status(500).json({ error: err.message })
                return null
            }
            res.status(200).json({ message: 'updated' })
        })
    }
}
