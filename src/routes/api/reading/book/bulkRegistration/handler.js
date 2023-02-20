import { tableName } from '../../../../../utils.js'

const SQL__INSERT_INTO_BOOK = `
    INSERT INTO ${tableName('book')}(userId, title, story) values (?,?,?)
`

export default function registerBooksHandler(req, res) {
    const db = res.sqlite
    // const errors = validate(REGISTER_BOOK_SCHEMA, req.body)
    // if (errors) {
    //     res.status(400).json({ message: errors })
    // } else {
    // 'prepare' returns a 'statement' object which allows us to
    // bind the same query to different parameters each time we run it
    let statement = db.prepare(SQL__INSERT_INTO_BOOK)

    const params = req.body.books.map((book) => [
        req.body.userId,
        book.title,
        book.story
    ])

    // run the query over and over for each inner array
    for (let i = 0; i < params.length; i++) {
        statement.run(params[i], function (err) {
            if (err) {
                res.status(500).json({ message: err })
                return null
            }
        })
    }

    // 'finalize' basically kills our ability to call .run(...) on the 'statement'
    // object again. Optional.
    statement.finalize()

    res.status(200).json({ message: 'Bulk registration completed!' })
    //  }
}
