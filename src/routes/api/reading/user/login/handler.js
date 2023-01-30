import LOGIN_USER_SCHEMA from './schema.js'
import validate from '../../../../../validator.js'
import { userTableName } from '../../../../../utils.js'
import { createJWT } from '../../../../../middleware/auth.js'

const ERROR_MESSAGE = { error: 'Incorrect username or password' }

const SQL__SELECT_USER = `
  SELECT * FROM ${userTableName} WHERE email = ?
`
function passwordMatch(userPassword, rowPassword) {
    return userPassword === rowPassword
}

export default function loginUserHandler(req, res) {
    const errors = validate(LOGIN_USER_SCHEMA, req.body)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: { message: errors } })
    } else {
        res.sqlite.get(
            SQL__SELECT_USER,
            [req.body.username],
            function callback(err, row) {
                if (row) {
                    if (passwordMatch(req.body.password, row.password)) {
                        const payload = { id: row.id, email: row.email }
                        const token = createJWT(payload)
                        delete row.password
                        res.status(200).json({ token, data: row })
                    } else {
                        res.status(500).json(ERROR_MESSAGE)
                    }
                } else {
                    res.status(500).json(ERROR_MESSAGE)
                }
            }
        )
    }
}
