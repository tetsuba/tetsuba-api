import { tableName } from '../../../../../utils.js'

export const SQL__SELECT_ALL_USERS = `
  SELECT id, firstName, lastName, email FROM ${tableName(
      'user'
  )} WHERE email = ?
`

export default function getUserHandler(req, res) {
    res.sqlite.get(
        SQL__SELECT_ALL_USERS,
        [res.user.email],
        function callback(err, row) {
            if (err) return res.status(500).json(err)
            if (!row) return res.status(401).json({ message: 'Not authorized' })
            res.status(200).json(row)
        }
    )
}
