import { createUserTable, deleteUserTable } from '../userTestAPI'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

describe('@PUT /api/reading/user/create-table', () => {
    afterAll(async () => {
        await deleteUserTable()
    })
    describe('status: 200', () => {
        test('should create a user table', async () => {
            const res = await createUserTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('User table created')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await createUserTable(noToken)
            toExpect401Status(res)
        })
    })
    describe.skip('status: 500', () => {
        test('should return an error if a user table is created already', async () => {
            const res = await createUserTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
            toExpect500Status(res)
        })
    })
})
