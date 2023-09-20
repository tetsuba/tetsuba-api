import {
    createUserTable,
    deleteUserTable,
    loginUser,
    registerUser
} from '../userTestAPI.js'
import { createStudentTable } from '../../student/studentTestAPI.js'

const USER_CREDENTIALS = { username: 'bob@bob.com', password: '123456' }

describe('@POST /api/reading/user/login', () => {
    beforeAll(async () => {
        await createUserTable()
        await createStudentTable()
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
            expect(expectedResponse).toHaveProperty('user')
            expect(expectedResponse).toHaveProperty('students')
            expect(expectedResponse).toHaveProperty('books')
        })
    })
    describe('status: 400', () => {
        test('with incorrect credentials', async () => {
            const CREDENTIALS_MISSING_PASSWORD = {
                username: 'bob@bob.com',
                p: '123'
            }
            const res = await loginUser(CREDENTIALS_MISSING_PASSWORD)
            const json = JSON.parse(res.text)

            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'password', data must NOT have additional properties"
            })
        })
    })
    describe('status: 500', () => {
        test('with incorrect password', async () => {
            const res = await loginUser({
                username: 'bob@bob.com',
                password: '1'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: 'Incorrect username or password'
            })
        })
        test('with incorrect email', async () => {
            const res = await loginUser({
                username: 'bob22@bob.com',
                password: '123456'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: 'Incorrect username or password'
            })
        })
    })
})
