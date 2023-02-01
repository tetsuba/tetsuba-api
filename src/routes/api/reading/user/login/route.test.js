import {
    createUserTable,
    deleteUserTable,
    loginUser,
    registerUser
} from '../userMockRequest.js'

const USER_CREDENTIALS = { username: 'bob@bob.com', password: '123456' }

describe('@POST /api/reading/user/login', () => {
    beforeAll(async () => {
        await createUserTable()
        await registerUser({
            firstName: 'bob',
            lastName: 'bob',
            email: 'bob@bob.com',
            password: '123456'
        })
    })
    afterAll(async () => {
        await deleteUserTable()
    })

    describe('status: 200', () => {
        test('should respond with a token and user data', async () => {
            const res = await loginUser(USER_CREDENTIALS)
            const expectedResponse = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(expectedResponse).toHaveProperty('token')
            expect(expectedResponse).toHaveProperty('data')
        })
    })
    describe('status: 400', () => {
        test('with incorrect credentials', async () => {
            const CREDENTIALS_MISSING_PASSWORD = {
                username: 'bob@bob.com',
                p: '123'
            }
            const res = await loginUser(CREDENTIALS_MISSING_PASSWORD)
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'password'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    'data must NOT have additional properties'
                )
            )
        })
    })
    describe('status: 500', () => {
        test('with incorrect password', async () => {
            const res = await loginUser({
                username: 'bob@bob.com',
                password: '1'
            })
            expect(res.status).toBe(500)
            expect(res.text).toEqual(
                expect.stringContaining('Incorrect username or password')
            )
        })
        test('with incorrect email', async () => {
            const res = await loginUser({
                username: 'bob22@bob.com',
                password: '123456'
            })
            expect(res.status).toBe(500)
            expect(res.text).toEqual(
                expect.stringContaining('Incorrect username or password')
            )
        })
    })
})
