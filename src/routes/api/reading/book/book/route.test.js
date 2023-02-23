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
                story: 'story'
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
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be integer')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getBook('', noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getBook(query)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
