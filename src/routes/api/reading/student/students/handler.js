import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import STUDENTS_SCHEMA from './schema.js'

export const SQL__SELECT_STUDENTS = `
  SELECT * FROM ${tableName('student')} WHERE userId = ?
`

export function responseGetStudents(db, res, userId, status, next) {
    db.all(SQL__SELECT_STUDENTS, [userId], function (error, rows) {
        if (error) {
            next({ status: 500, stack: error })
        } else {
            res.status(status || 200).json(rows)
        }
    })
}

export default function getStudentsHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.userId = +req.query.userId
    // *****************************************************
    const errors = validate(STUDENTS_SCHEMA, req.query)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        responseGetStudents(res.sqlite, res, req.query.userId, false, next)
    }
}
