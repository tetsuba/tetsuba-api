import validate from '../../../../../validator.js'
import REGISTER_USER_SCHEMA from './schema.js'
import { getValuesFrom, userTableName } from '../../../../../utils.js'

const SQL__INSERT_INTO_USER = `
  INSERT INTO ${userTableName}(firstName, lastName, email, password) values (?,?,?,?)
`

export default function registerNewUserHandler(req, res) {
    console.log('[registerNewUserHandler]: ')
    const errors = validate(REGISTER_USER_SCHEMA, req.query)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: { message: errors } })
    } else {
        res.sqlite.run(
            SQL__INSERT_INTO_USER,
            getValuesFrom(req.query),
            function callback(err) {
                if (err) {
                    res.status(500) // Internal Server Error
                        .json({
                            error: {
                                message: err.message
                            }
                        })
                } else {
                    res.status(201) // Created
                        .json({ success: 'User registered!' })
                }
            }
        )
    }
}
