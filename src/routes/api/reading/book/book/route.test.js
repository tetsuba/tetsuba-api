import {
    createBookTable,
    deleteBookTable,
    getBook,
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

describe('@GET /api/reading/book', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await createTrackerTable()
            await addTracker({ userId: 1 })
            await registerBook({
                userId: 1,
                title: 'title',
                story: ['story']
            })
        })
        afterAll(async () => {
            await deleteBookTable()
            await deleteTrackerTable()
        })
        test('should respond with four book collections', async () => {
            const res = await getBook(query)
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveLength(4)
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getBook('')
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/userId must be integer'
            })
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getBook('', noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getBook(query)
            toExpect500Status(res)
        })
    })
})
