import { tableName } from '../../../../../utils.js'

export const SQL__SELECT_BOOK = `
  SELECT id, firstName, lastName, email FROM ${tableName('book')} WHERE id = ?
`

export default function getUserHandler(req, res) {
    res.sqlite.get(SQL__SELECT_BOOK, [0], function callback(err, row) {
        if (err) return res.status(500).json(err)
        if (!row) return res.status(500).json({ message: 'Not authorized' })
        res.status(200).json(row)
    })
}
