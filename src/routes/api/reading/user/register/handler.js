import validate from '../../../../../validator.js'
import REGISTER_USER_SCHEMA from './schema.js'
import { getValuesFrom, tableName } from '../../../../../utils.js'
import { SQL__INSERT_INTO_TRACKER } from '../../tracker/add/handler.js'
import { SQL__SELECT_USER } from '../user/handler.js'

const SQL__INSERT_INTO_USER = `
  INSERT INTO ${tableName(
      'user'
  )}(firstName, lastName, email, password) values (?,?,?,?)
`

export default function registerNewUserHandler(req, res) {
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
                    res.sqlite.get(
                        SQL__SELECT_USER,
                        [req.query.email],
                        (err, row) => {
                            res.sqlite.run(
                                SQL__INSERT_INTO_TRACKER,
                                [row.id],
                                () => {
                                    res.status(201) // Created
                                        .json({ success: 'User registered!' })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}
