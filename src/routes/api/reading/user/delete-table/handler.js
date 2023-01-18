import sqlite from '../../../../../database/index.js'
import { userTableName } from '../../../../../utils.js'

const SQL__DELETE_TABLE_USER = `
  DROP TABLE ${userTableName}
`

const PARAMS_NONE = []

export default function deleteTableHandler(req, res) {
    sqlite()
        .all(SQL__DELETE_TABLE_USER, PARAMS_NONE, function callback() {
            res.status(200).json({ message: 'DELETED' })
        })
        .close()
}
