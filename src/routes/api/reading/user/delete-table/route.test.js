import { createUserTable, deleteUserTable } from '../userTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

describe('@PUT /api/reading/user/delete-table', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createUserTable()
        })
        test('should delete a user table', async () => {
            const res = await deleteUserTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('User Table Deleted')
            )
        })
    })
    describe('status: 401', () => {
        beforeAll(async () => {
            await createUserTable()
        })
        afterAll(async () => {
            await deleteUserTable()
        })
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteUserTable(noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should error if no user table exists', async () => {
            const res = await deleteUserTable()
            toExpect500Status(res)
        })
    })
})
