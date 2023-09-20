import LOGIN_USER_SCHEMA from './schema.js'
import validate from '../../../../../validator.js'
import { tableName } from '../../../../../utils.js'
import { createJWT } from '../../../../../middleware/auth.js'
import library from '../../../../../database/static/library.js'
import { getStudentsFromDB } from '../../student/students/handler.js'

const SQL__SELECT_USER = `
  SELECT * FROM ${tableName('user')} WHERE email = ?
`

function getUser(db, params, cb) {
    db.get(SQL__SELECT_USER, params, cb)
}

function passwordMatch(userPassword, rowPassword) {
    return userPassword === rowPassword
}

export default function loginUserHandler(req, res, next) {
    const errors = validate(LOGIN_USER_SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const db = res.sqlite
        const { username, password } = req.body
        getUser(db, [username], (err, row) => {
            if (row && passwordMatch(password, row.password)) {
                const payload = { id: row.id, email: row.email }
                const token = createJWT(payload)
                delete row.password

                const PARAMS = [row.id]
                getStudentsFromDB(db, PARAMS, (error, rows) => {
                    if (error) {
                        next({ status: 500, stack: error })
                    } else {
                        res.status(200).json({
                            token,
                            user: row,
                            books: library,
                            students: rows
                        })
                    }
                })
            } else {
                next({
                    status: 500,
                    stack: 'Incorrect username or password'
                })
            }
        })
    }
}
