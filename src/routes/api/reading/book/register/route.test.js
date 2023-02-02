import {
    createBookTable,
    deleteBookTable,
    registerBook
} from '../bookTestAPI.js'

const BOOK_DATA = {
    userId: 1,
    title: 'A new story',
    story: 'Once upon a time',
    difficulty: 'easy'
}

describe('@POST /api/reading/book/register', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createBookTable()
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should register a book', async () => {
            const res = await registerBook(BOOK_DATA)
            expect(res.status).toBe(201)
            expect(res.text).toBe('{"success":"Book registered!"}')
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await registerBook({})
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'userId'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'title'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'story'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'difficulty'"
                )
            )
        })
        test('with userId as a string', async () => {
            const res = await registerBook({ ...BOOK_DATA, userId: '011' })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be number')
            )
        })
        test('with an additional property', async () => {
            const res = await registerBook({
                ...BOOK_DATA,
                newProperty: 'something'
            })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    'data must NOT have additional properties'
                )
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await registerBook({}, noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await registerBook(BOOK_DATA)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
