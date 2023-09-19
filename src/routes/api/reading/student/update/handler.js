import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import UPDATE_STUDENT_SCHEMA from './schema.js'
import { responseGetStudents } from '../students/handler.js'

const SQL__UPDATE_STUDENT = `
    UPDATE ${tableName(
        'student'
    )} SET firstname=?, lastname=?, dob=? WHERE studentId = ?
`

export default function updateStudentHandler(req, res, next) {
    const errors = validate(UPDATE_STUDENT_SCHEMA, req.body)

    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const { studentId, firstname, lastname, dob } = req.body
        const PARAMS = [firstname, lastname, dob, studentId]
        res.sqlite.run(SQL__UPDATE_STUDENT, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                responseGetStudents(res.sqlite, res, res.user.id, 200, next)
            }
        })
    }
}
