import {
    createBookTable,
    deleteBookTable,
    editBook,
    registerBook
} from '../bookTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

const BOOK_DATA = {
    userId: 1,
    title: 'A new story',
    story: 'Once upon a time'
}

const UPDATED_BOOK_DATA = {
    id: 1,
    title: 'updated story',
    story: 'updated'
}

describe('@PUT /api/reading/book/edit', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook(BOOK_DATA)
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should register a book', async () => {
            const res = await editBook(UPDATED_BOOK_DATA)
            expect(res.text).toBe('{"message":"Book updated"}')
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await editBook({})
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'id', data must have required property 'title', data must have required property 'story'"
            })
        })
        test('with id as a string', async () => {
            const res = await editBook({ ...UPDATED_BOOK_DATA, id: '011' })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/id must be number'
            })
        })
        test('with an additional property', async () => {
            const res = await editBook({
                ...UPDATED_BOOK_DATA,
                newProperty: 'something'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data must NOT have additional properties'
            })
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await editBook({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await editBook(UPDATED_BOOK_DATA)
            toExpect500Status(res)
        })
    })
})
