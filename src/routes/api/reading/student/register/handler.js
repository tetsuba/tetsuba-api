import { tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import REGISTER_STUDENT_SCHEMA from './schema.js'
import { responseGetStudents } from '../students/handler.js'

const SQL__INSERT_INTO_STUDENT = `
    INSERT INTO ${tableName(
        'student'
    )}(userId, firstname, lastname, dob) values (?,?,?,?)
`

export default function registerStudentHandler(req, res, next) {
    const db = res.sqlite
    const errors = validate(REGISTER_STUDENT_SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const PARAMS = [
            req.body.userId,
            req.body.firstname,
            req.body.lastname,
            req.body.dob
        ]
        db.run(SQL__INSERT_INTO_STUDENT, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                responseGetStudents(db, res, req.body.userId, 201, next)
            }
        })
    }
}
