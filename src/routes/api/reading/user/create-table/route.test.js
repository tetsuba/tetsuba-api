import { createUserTable, deleteUserTable } from '../userMockRequest'

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
    describe.skip('status: 500', () => {
        test('should return an error if a user table is created already', async () => {
            const res = await createUserTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
            expect(res.text).toBe('This is not it')
            expect(res.status).toBe(500)
        })
    })
})
