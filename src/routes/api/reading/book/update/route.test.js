import {
    createBookTable,
    deleteBookTable,
    updateBook,
    registerBook
} from '../bookTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

const REGISTER_BOOK_DATA = {
    userId: 1,
    title: 'Book Title',
    story: ['This is a story.']
}

const UPDATE_BOOK_HISTORY_DATA = {
    id: 1,
    history: JSON.stringify([{ date: '12/12/12', words: ['word', 'word'] }])
}

describe('@PATCH /api/reading/book/update', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook(REGISTER_BOOK_DATA)
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should update the history in a book', async () => {
            const res = await updateBook(UPDATE_BOOK_HISTORY_DATA)
            const data = JSON.parse(res.text)
            expect(data[0].history).toEqual(UPDATE_BOOK_HISTORY_DATA.history)
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await updateBook({})
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'id', data must have required property 'history'"
            })
        })
        test('with id as a string', async () => {
            const res = await updateBook({
                ...UPDATE_BOOK_HISTORY_DATA,
                id: '011'
            })
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
            const res = await updateBook({
                ...UPDATE_BOOK_HISTORY_DATA,
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
            const res = await updateBook({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await updateBook(UPDATE_BOOK_HISTORY_DATA)
            toExpect500Status(res)
        })
    })
})
