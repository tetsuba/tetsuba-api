import {
    createUserTable,
    deleteUserTable,
    registerUser
} from '../userTestAPI.js'

const USER_DETAILS_CORRECT = {
    firstName: 'bob',
    lastName: 'bob',
    email: 'bob@bob.com',
    password: '123456'
}

const USER_DETAILS_INCORRECT = {
    firstName: '@bob',
    lastName: '&bob',
    email: 'bob2@bob.com',
    password: '123456'
}

describe('@POST /api/reading/user/register', () => {
    beforeAll(async () => {
        await createUserTable()
    })
    afterAll(async () => {
        await deleteUserTable()
    })
    describe('status: 201', () => {
        test('should register a user', async () => {
            const res = await registerUser(USER_DETAILS_CORRECT)
            expect(res.status).toBe(201)
            expect(res.text).toBe('{"success":"User registered!"}')
        })
    })
    describe('status: 400', () => {
        test('should error. firstName and lastName [First letter must be a character]', async () => {
            const res = await registerUser(USER_DETAILS_INCORRECT)
            expect(res.status).toBe(400)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/firstName First letter must be a character, data/lastName First letter must be a character'
            })
        })
        test('should error. Query missing all properties', async () => {
            const res = await registerUser({})
            expect(res.status).toBe(400)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'firstName', data must have required property 'lastName', data must have required property 'email', data must have required property 'password'"
            })
        })
    })
    describe('status: 500', () => {
        test('should error: email [UNIQUE constraint failed]', async () => {
            const res = await registerUser(USER_DETAILS_CORRECT)
            expect(res.status).toBe(500)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: 'SQLITE_CONSTRAINT: UNIQUE constraint failed: userTest.email'
            })
        })
    })
})
