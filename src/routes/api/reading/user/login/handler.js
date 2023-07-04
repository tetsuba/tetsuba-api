import LOGIN_USER_SCHEMA from './schema.js'
import validate from '../../../../../validator.js'
import { tableName } from '../../../../../utils.js'
import { createJWT } from '../../../../../middleware/auth.js'

const SQL__SELECT_USER = `
  SELECT * FROM ${tableName('user')} WHERE email = ?
`
function passwordMatch(userPassword, rowPassword) {
    return userPassword === rowPassword
}

export default function loginUserHandler(req, res, next) {
    const errors = validate(LOGIN_USER_SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
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
                        next({
                            status: 500,
                            stack: 'Incorrect username or password'
                        })
                    }
                } else {
                    next({
                        status: 500,
                        stack: 'Incorrect username or password'
                    })
                }
            }
        )
    }
}
