import { parseStudentProgress, tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import STUDENTS_SCHEMA from './schema.js'

export const SQL__SELECT_STUDENTS = `
  SELECT studentId, firstname, lastname, dob, progress FROM ${tableName(
      'student'
  )} WHERE userId = ?
`

export function getStudentsFromDB(db, params, cb) {
    db.all(SQL__SELECT_STUDENTS, params, cb)
}

export default function getStudentsHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(STUDENTS_SCHEMA, req.query)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const db = res.sqlite
        const PARAMS = [res.user.id]
        getStudentsFromDB(db, PARAMS, (error, rows) => {
            if (error) {
                next({ status: 500, stack: error })
            } else {
                res.status(200).json(parseStudentProgress(rows))
            }
        })
    }
}
