import { tableName } from '../../../../../utils.js'

const SQL__CREATE_TABLE_STUDENT = `
    CREATE TABLE IF NOT EXISTS ${tableName('student')} (
        studentId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        dob TEXT NOT NULL,
        history TEXT
    )
`

const PARAMS_NONE = []

export default function createTableHandler(req, res, next) {
    res.sqlite.run(
        SQL__CREATE_TABLE_STUDENT,
        PARAMS_NONE,
        function callback(err) {
            /* istanbul ignore next 2 */
            if (err) {
                next({ status: 500, stack: err })
            } else {
                res.status(200).json({ message: 'Student table created' })
            }
        }
    )
}
