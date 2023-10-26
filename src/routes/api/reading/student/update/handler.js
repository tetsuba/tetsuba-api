import { parseStudentProgress, tableName } from '../../../../../utils.js'
import validate from '../../../../../validator.js'
import UPDATE_STUDENT_SCHEMA from './schema.js'
import { getStudentsFromDB } from '../students/handler.js'

const SQL__UPDATE_STUDENT = `UPDATE ${tableName(
    'student'
)} SET firstname=?, lastname=?, dob=?, progress=? WHERE studentId=?`

export default function updateStudentHandler(req, res, next) {
    const errors = validate(UPDATE_STUDENT_SCHEMA, req.body)
    if (errors) {
        next({ status: 400, stack: errors })
    } else {
        const { studentId, firstname, lastname, dob, progress } = req.body
        const PARAMS = [firstname, lastname, dob, progress, studentId]
        res.sqlite.run(SQL__UPDATE_STUDENT, PARAMS, function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
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
        })
    }
}
