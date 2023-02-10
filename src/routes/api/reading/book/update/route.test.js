import {
    createBookTable,
    deleteBookTable,
    updateBook,
    registerBook
} from '../bookTestAPI.js'

const BOOK_DATA = {
    userId: 1,
    history: 'A new story'
}

const UPDATED_BOOK_DATA = {
    id: 1,
    history: 'updated story'
}

describe('@PATCH /api/reading/book/update', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook(BOOK_DATA)
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should update the history in a book', async () => {
            const res = await updateBook(UPDATED_BOOK_DATA)
            expect(res.text).toBe('{"message":"Book updated"}')
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await updateBook({})
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining("data must have required property 'id'")
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'history'"
                )
            )
        })
        test('with id as a string', async () => {
            const res = await updateBook({ ...UPDATED_BOOK_DATA, id: '011' })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('id must be number')
            )
        })
        test('with an additional property', async () => {
            const res = await updateBook({
                ...UPDATED_BOOK_DATA,
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
            const res = await updateBook({}, noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await updateBook(UPDATED_BOOK_DATA)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
