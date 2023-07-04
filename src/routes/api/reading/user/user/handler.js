import { tableName } from '../../../../../utils.js'

export const SQL__SELECT_USER = `
  SELECT id, firstName, lastName, email FROM ${tableName(
      'user'
  )} WHERE email = ?
`

export default function getUserHandler(req, res, next) {
    res.sqlite.get(
        SQL__SELECT_USER,
        [res.user.email],
        function callback(err, row) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                if (!row) {
                    next({ status: 500, stack: 'email not found' })
                } else {
                    res.status(200).json(row)
                }
            }
        }
    )
}
