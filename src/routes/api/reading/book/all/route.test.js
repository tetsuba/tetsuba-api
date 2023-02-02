import {
    createBookTable,
    deleteBookTable,
    getAllBooks
} from '../bookTestAPI.js'

describe('@GET /api/reading/book/all', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should respond with an array', async () => {
            const res = await getAllBooks()
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveLength(0)
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getAllBooks(noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getAllBooks()
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
