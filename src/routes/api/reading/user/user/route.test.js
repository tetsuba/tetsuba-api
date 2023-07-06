import request from 'supertest'
import app from '../../../../index.js'
import {
    createUserTable,
    deleteUserTable,
    registerUser,
    loginUser
} from '../userTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

async function getUserDetails(token) {
    const bearer = token ? `Bearer ${token}` : ''
    return request(app).get(`/api/reading/user`).set('Authorization', bearer)
}

describe('@GET /api/reading/user', () => {
    describe('status: 200', () => {
        let token
        beforeAll(async () => {
            await createUserTable()
            await registerUser({
                firstName: 'bob',
                lastName: 'bob',
                email: 'bob@bob.com',
                password: '123456'
            })
            const res = await loginUser({
                username: 'bob@bob.com',
                password: '123456'
            })
            const data = JSON.parse(res.text)
            token = data.token
        })
        afterAll(async () => {
            await deleteUserTable()
        })
        test('with Beaer token and respond with user data', async () => {
            const res = await getUserDetails(token)
            const expectedResponse = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(expectedResponse).toHaveProperty('firstName')
            expect(expectedResponse).toHaveProperty('lastName')
            expect(expectedResponse).toHaveProperty('id')
            expect(expectedResponse).toHaveProperty('email')
        })
    })
    describe('status: 401', () => {
        beforeAll(async () => {
            await createUserTable()
        })
        afterAll(async () => {
            await deleteUserTable()
        })
        test('requests without Bearer token', async () => {
            const res = await getUserDetails()
            toExpect401Status(res)
        })
        test('should respond with an 401 error [Incorrect Bearer token]', async () => {
            const res = await getUserDetails('sdklfjskdfjsdkfjl')
            const json = JSON.parse(res.text)
            expect(res.status).toBe(401)
            expect(json).toEqual({
                success: false,
                status: 401,
                message: 'Unauthorized',
                stack: {
                    expired: false
                }
            })
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const tokenWithWrongEmail = process.env.BEARER_TOKEN_WRONG_EMAIL
            const res = await getUserDetails(tokenWithWrongEmail)
            toExpect500Status(res)
        })

        test('with a Bearer token with incorrect email', async () => {
            await createUserTable()
            const tokenWithWrongEmail = process.env.BEARER_TOKEN_WRONG_EMAIL
            const res = await getUserDetails(tokenWithWrongEmail)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: 'email not found'
            })
            await deleteUserTable()
        })
    })
})
