import { tableName } from '../../../../../utils.js'
import library from '../../../../../database/static/library.js'

export const SQL__SELECT_ALL_BOOKS = `
  SELECT * FROM ${tableName('book')}
`
// TODO: get all user id books
// need a userId to find the books
const PARAMS_NONE = []
export default function getAllBooksHandler(req, res, next) {
    res.sqlite.all(
        SQL__SELECT_ALL_BOOKS,
        PARAMS_NONE,
        function callback(err, rows) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                library[0].books = rows
                res.status(200).json(rows)
            }
        }
    )
}
