import { userTableName } from '../../../../../utils.js'

const SQL__CREATE_TABLE_USER = `
    CREATE TABLE IF NOT EXISTS ${userTableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        CONSTRAINT email_unique UNIQUE (email)
    )
`

const PARAMS_NONE = []

export default function createTableHandler(req, res) {
    res.sqlite.all(SQL__CREATE_TABLE_USER, PARAMS_NONE, function callback(err) {
        if (err) {
            return res.status(500).json(err)
        }
        res.status(200).json({ message: 'CREATED' })
    })
}
