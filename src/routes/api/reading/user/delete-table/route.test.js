import { createUserTable, deleteUserTable } from '../userTestAPI.js'

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
    describe('status: 500', () => {
        test('should error if no user table exists', async () => {
            const res = await deleteUserTable()
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
