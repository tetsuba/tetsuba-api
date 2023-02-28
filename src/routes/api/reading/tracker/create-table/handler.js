import { tableName } from '../../../../../utils.js'

const SQL__CREATE_TABLE_TRACKER = `
    CREATE TABLE IF NOT EXISTS ${tableName('tracker')} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER UNIQUE NOT NULL,
        data TEXT,
        CONSTRAINT email_unique UNIQUE (userId)
    )
`

const PARAMS_NONE = []

export default function createTableHandler(req, res) {
    res.sqlite.run(
        SQL__CREATE_TABLE_TRACKER,
        PARAMS_NONE,
        function callback(err) {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json({ message: 'Tracker table created' })
        }
    )
}
