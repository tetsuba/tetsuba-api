import { tableName } from '../../../../../utils.js'

const SQL__DELETE_TABLE_TRACKER = `
  DROP TABLE ${tableName('tracker')}
`

const PARAMS_NONE = []

export default function deleteTableHandler(req, res) {
    res.sqlite.run(
        SQL__DELETE_TABLE_TRACKER,
        PARAMS_NONE,
        function callback(err) {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json({ message: 'Tracker Table Deleted' })
        }
    )
}
