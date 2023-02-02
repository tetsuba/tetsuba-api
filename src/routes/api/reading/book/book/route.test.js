import {
    createBookTable,
    deleteBookTable,
    getBook,
    registerBook
} from '../bookTestAPI.js'

describe('@GET /api/reading/book', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook({
                userId: 1,
                title: 'title',
                story: 'story',
                difficulty: 'easy'
            })
            await registerBook({
                userId: 2,
                title: 'title',
                story: 'story',
                difficulty: 'easy'
            })
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
        test('should respond with all books with the same userId', async () => {
            const res = await getBook({ userId: 1 })
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveLength(2)
            console.log(res.text)
        })
    })
    describe('status: 400', () => {
        test('without a userId', async () => {
            const res = await getBook()
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'userId'"
                )
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getBook({}, noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getBook({ userId: 1 })
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
