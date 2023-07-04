import { tableName } from '../../../../../utils.js'

const SQL__DELETE_TABLE_BOOK = `
  DROP TABLE ${tableName('book')}
`

const PARAMS_NONE = []

export default function deleteTableHandler(req, res, next) {
    res.sqlite.run(SQL__DELETE_TABLE_BOOK, PARAMS_NONE, function callback(err) {
        if (err) {
            next({ status: 500, stack: err })
        } else {
            res.status(200).json({ message: 'Book Table Deleted' })
        }
    })
}
