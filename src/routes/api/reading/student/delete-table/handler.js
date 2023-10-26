import { tableName } from '../../../../../utils.js'

const SQL__DELETE_TABLE_STUDENT = `
  DROP TABLE ${tableName('student')}
`

const PARAMS_NONE = []

export default function deleteTableHandler(req, res, next) {
    res.sqlite.run(
        SQL__DELETE_TABLE_STUDENT,
        PARAMS_NONE,
        function callback(err) {
            if (err) {
                next({ status: 500, stack: err })
            } else {
                res.status(200).json({ message: 'Student Table Deleted' })
            }
        }
    )
}
