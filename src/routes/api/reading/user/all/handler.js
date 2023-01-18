import sqlite from '../../../../../database/index.js'
import { userTableName } from '../../../../../utils.js'

export const SQL__SELECT_ALL_USERS = `
  SELECT * FROM ${userTableName}
`

const PARAMS_NONE = []
export default function getAllUsersHandler(req, res) {
    console.log(res.user)
    sqlite()
        .all(SQL__SELECT_ALL_USERS, PARAMS_NONE, function callback(err, rows) {
            res.status(200).json(rows)
        })
        .close()
}
