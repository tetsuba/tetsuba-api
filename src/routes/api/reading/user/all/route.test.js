import {
    createUserTable,
    deleteUserTable,
    getAllUsers
} from '../userTestAPI.js'

describe('@GET /api/reading/user/all', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createUserTable()
        })
        afterAll(async () => {
            await deleteUserTable()
        })
        test('should respond with an array', async () => {
            const res = await getAllUsers()
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveLength(0)
        })
    })

    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getAllUsers()
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
