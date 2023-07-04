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
            const res = await getTracker('', noToken)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(401)
            expect(json).toEqual({
                success: false,
                status: 401,
                message: 'Unauthorized',
                stack: ''
            })
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getTracker(query)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: json.stack
            })
        })
    })
})
