import {
    createTrackerTable,
    deleteTrackerTable,
    addTracker,
    getTracker
} from '../trackerTestApi.js'

describe('@GET /api/reading/tracker', () => {
    const query = '?userId=2'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createTrackerTable()
            await addTracker({
                userId: 1
            })
            await addTracker({
                userId: 2
            })
        })
        afterAll(async () => {
            await deleteTrackerTable()
        })
        test('should respond with tracking data', async () => {
            const res = await getTracker(query)
            expect(res.status).toBe(200)
            expect(res.text).toBe('{"id":2,"userId":2,"data":null}')
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getTracker('')
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be integer')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getTracker('', noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getTracker(query)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
