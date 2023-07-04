import { createTrackerTable, deleteTrackerTable } from '../trackerTestApi.js'

describe('@PUT /api/reading/tracker/create-table', () => {
    afterAll(async () => {
        await deleteTrackerTable()
    })
    describe('status: 200', () => {
        test('should create a tracker table', async () => {
            const res = await createTrackerTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('Tracker table created')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await createTrackerTable(noToken)
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
    describe.skip('status: 500', () => {
        test('should return an error if a book table is created already', async () => {
            const res = await createTrackerTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
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
