import { userTableName } from '../../../../../utils.js'

export const SQL__SELECT_ALL_USERS = `
  SELECT * FROM ${userTableName}
`

const PARAMS_NONE = []
export default function getAllUsersHandler(req, res) {
    res.sqlite.all(
        SQL__SELECT_ALL_USERS,
        PARAMS_NONE,
        function callback(err, rows) {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(rows)
        }
    )
}
