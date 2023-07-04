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
