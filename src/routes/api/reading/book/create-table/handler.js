import { tableName } from '../../../../../utils.js'

const SQL__CREATE_TABLE_BOOK = `
    CREATE TABLE IF NOT EXISTS ${tableName('book')} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        title TEXT NOT NULL,
        story TEXT NOT NULL,
        difficulty TEXT NOT NULL
    )
`

const PARAMS_NONE = []

export default function createTableHandler(req, res) {
    res.sqlite.run(SQL__CREATE_TABLE_BOOK, PARAMS_NONE, function callback(err) {
        if (err) {
            return res.status(500).json(err)
        }
        res.status(200).json({ message: 'Book table created' })
    })
}
