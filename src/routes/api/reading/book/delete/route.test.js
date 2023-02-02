import {
    createBookTable,
    deleteBook,
    deleteBookTable,
    registerBook
} from '../bookTestAPI.js'

describe('@DELETE /api/reading/book/delete', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook({
                userId: 1,
                title: 'title',
                story: 'story',
                difficulty: 'easy'
            })
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should delete a book', async () => {
            const res = await deleteBook({ id: 1 })
            expect(res.text).toEqual(expect.stringContaining('Book deleted'))
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('without a userId', async () => {
            const res = await deleteBook()
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining("data must have required property 'id'")
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteBook({}, noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await deleteBook({ id: 1 })
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
