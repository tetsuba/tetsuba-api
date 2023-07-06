import {
    createBookTable,
    deleteBook,
    deleteBookTable,
    registerBook
} from '../bookTestAPI.js'
import {
    addTracker,
    createTrackerTable,
    deleteTrackerTable
} from '../../tracker/trackerTestApi.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

const mockQuery = '?bookId=2'

describe('@DELETE /api/reading/book/delete', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook({
                userId: 1,
                title: 'title',
                story: ['story']
            })
            await registerBook({
                userId: 2, // userId must match the bearer token
                title: 'title2',
                story: ['story2']
            })
            await createTrackerTable()
            await addTracker({ userId: 1 })
        })
        afterAll(async () => {
            await deleteBookTable()
            await deleteTrackerTable()
        })
        test('should delete a book', async () => {
            const res = await deleteBook(mockQuery)
            const data = JSON.parse(res.text)
            expect(data[0].books).toHaveLength(1)
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('query as an empty string', async () => {
            const res = await deleteBook('')
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/bookId must be integer'
            })
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteBook({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await deleteBook(mockQuery)
            toExpect500Status(res)
        })
    })
})
