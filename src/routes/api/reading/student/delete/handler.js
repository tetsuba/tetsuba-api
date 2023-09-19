import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import BOOK_DELETE_SCHEMA from './schema.js'
import { responseGetStudents } from '../students/handler.js'

export const SQL__DELETE_BOOK = `
  DELETE FROM ${tableName('student')} WHERE studentId = ?
`

export default function deleteStudentHandler(req, res, next) {
    // This is a hack to convert the userId to be an integer.
    req.query.studentId = +req.query.studentId
    // *****************************************************
    const errors = validate(BOOK_DELETE_SCHEMA, req.query)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const PARAMS = [req.query.studentId]

        res.sqlite.run(SQL__DELETE_BOOK, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                responseGetStudents(res.sqlite, res, res.user.id, false, next)
            }
        })
    }
}
