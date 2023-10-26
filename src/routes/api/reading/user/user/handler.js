import { parseStudentProgress, tableName } from '../../../../../utils.js'
import { getStudentsFromDB } from '../../student/students/handler.js'
import library from '../../../../../database/static/library.js'

export const SQL__SELECT_USER = `
  SELECT id, firstName, lastName, email FROM ${tableName(
      'user'
  )} WHERE email = ?
`

function getUserNoPassword(db, params, cb) {
    db.get(SQL__SELECT_USER, params, cb)
}

export default function getUserHandler(req, res, next) {
    const db = res.sqlite
    getUserNoPassword(db, [res.user.email], (err, row) => {
        if (err) {
            next({ status: 500, stack: err })
        } else {
            if (!row) {
                next({ status: 500, stack: 'email not found' })
            } else {
                const PARAMS = [row.id]
                getStudentsFromDB(db, PARAMS, (error, rows) => {
                    if (error) {
                        next({ status: 500, stack: error })
                    } else {
                        res.status(200).json({
                            user: row,
                            books: library,
                            students: parseStudentProgress(rows)
                        })
                    }
                })
            }
        }
    })
}
