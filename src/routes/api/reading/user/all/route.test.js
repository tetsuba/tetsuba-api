import {
    createUserTable,
    deleteUserTable,
    getAllUsers
} from '../userTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

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

    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getAllUsers(noToken)
            toExpect401Status(res)
        })
    })

    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getAllUsers()
            toExpect500Status(res)
        })
    })
})
