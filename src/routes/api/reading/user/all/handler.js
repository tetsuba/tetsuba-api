import { tableName } from '../../../../../utils.js'

export const SQL__SELECT_ALL_USERS = `
  SELECT * FROM ${tableName('user')}
`

const PARAMS_NONE = []
export default function getAllUsersHandler(req, res, next) {
    res.sqlite.all(
        SQL__SELECT_ALL_USERS,
        PARAMS_NONE,
        function callback(err, rows) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                res.status(200).json(rows)
            }
        }
    )
}
