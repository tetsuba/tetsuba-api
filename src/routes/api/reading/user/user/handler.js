import { userTableName } from '../../../../../utils.js'

export const SQL__SELECT_ALL_USERS = `
  SELECT id, firstName, lastName, email FROM ${userTableName} WHERE email = ?
`

export default function getUserHandler(req, res) {
    res.sqlite.get(
        SQL__SELECT_ALL_USERS,
        [res.user.email],
        function callback(err, row) {
            // TODO: this is not covered in the tests.
            //       Investigate how to trigger this 500 error
            if (err) return res.status(500).json(err)
            if (!row) return res.status(500).json({ message: 'Not authorized' })
            res.status(200).json(row)
        }
    )
}
