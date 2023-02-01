import request from 'supertest'
import app from '../../../../index.js'
import {
    createUserTable,
    deleteUserTable,
    registerUser,
    loginUser
} from '../userTestAPI.js'

async function getUserDetails(token) {
    const bearer = token ? `Bearer ${token}` : ''
    return request(app).get(`/api/reading/user`).set('Authorization', bearer)
}

describe('@GET /api/reading/user', () => {
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
        let token
        beforeAll(async () => {
            const res = await loginUser({
                username: 'bob@bob.com',
                password: '123456'
            })
            const data = JSON.parse(res.text)
            token = data.token
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
        test('requests without Bearer token', async () => {
            const res = await getUserDetails()

            expect(res.status).toBe(401)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
        })
        test('should respond with an 401 error [Incorrect Bearer token]', async () => {
            const res = await getUserDetails('sdklfjskdfjsdkfjl')
            expect(res.status).toBe(401)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
        })
    })
    describe('status: 500', () => {
        test('with a Bearer token with incorrect email', async () => {
            const tokenWithWrongEmail = process.env.BEARER_TOKEN_WRONG_EMAIL
            const res = await getUserDetails(tokenWithWrongEmail)

            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
        })
    })
})
