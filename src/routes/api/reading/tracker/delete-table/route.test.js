import { createTrackerTable, deleteTrackerTable } from '../trackerTestApi.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

describe('@PUT /api/reading/tracker/delete-table', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createTrackerTable()
        })
        test('should delete a tracker table', async () => {
            const res = await deleteTrackerTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('Tracker Table Deleted')
            )
        })
    })
    describe('status: 401', () => {
        beforeAll(async () => {
            await createTrackerTable()
        })
        afterAll(async () => {
            await deleteTrackerTable()
        })
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteTrackerTable(noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should error if no user table exists', async () => {
            const res = await deleteTrackerTable()
            toExpect500Status(res)
        })
    })
})
