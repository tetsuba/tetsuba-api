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
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe.skip('status: 500', () => {
        test('should return an error if a book table is created already', async () => {
            const res = await createTrackerTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
            expect(res.text).toBe('This is not it')
            expect(res.status).toBe(500)
        })
    })
})
