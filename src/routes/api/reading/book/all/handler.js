import { tableName } from '../../../../../utils.js'

export const SQL__SELECT_ALL_BOOKS = `
  SELECT * FROM ${tableName('book')}
`
// TODO: get all user id books
// need a userId to fing the books
const PARAMS_NONE = []
export default function getAllBooksHandler(req, res) {
    res.sqlite.all(
        SQL__SELECT_ALL_BOOKS,
        PARAMS_NONE,
        function callback(err, rows) {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(rows)
        }
    )
}
