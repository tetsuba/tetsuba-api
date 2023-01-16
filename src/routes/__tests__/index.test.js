import request from 'supertest'
import app from '../index'
import querystring from 'querystring'

describe('Routes', () => {
    describe('@READING', () => {
        describe(' - USER', () => {
            beforeAll(async () => {
                await request(app).get(`/api/reading/user/create-table`)
            })

            afterAll(async () => {
                await request(app).get(`/api/reading/user/delete-table`)
            })
            describe('POST api/reading/user/register', () => {
                test('should register a user', async () => {
                    const query = querystring.stringify({
                        firstName: 'bob',
                        lastName: 'bob',
                        email: 'bob@bob.com',
                        password: '123456'
                    })
                    const res = await request(app).post(
                        `/api/reading/user/register?${query}`
                    )

                    expect(res.status).toBe(201)
                    expect(res.text).toBe('{"success":"User registered!"}')
                })
                test('should error. email [UNIQUE constraint failed]', async () => {
                    const query = querystring.stringify({
                        firstName: 'bob',
                        lastName: 'bob',
                        email: 'bob@bob.com',
                        password: '123456'
                    })
                    const res = await request(app).post(
                        `/api/reading/user/register?${query}`
                    )

                    expect(res.status).toBe(500)
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            'UNIQUE constraint failed: userTest.email'
                        )
                    )
                })
                test('should error. firstName and lastName [First letter must be a character]', async () => {
                    const query = querystring.stringify({
                        firstName: '@bob',
                        lastName: '&bob',
                        email: 'bob2@bob.com',
                        password: '123456'
                    })
                    const res = await request(app).post(
                        `/api/reading/user/register?${query}`
                    )

                    expect(res.status).toBe(400)
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            'firstName First letter must be a character'
                        )
                    )
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            'lastName First letter must be a character'
                        )
                    )
                })
                test('should error. Query missing all properties', async () => {
                    const query = querystring.stringify({})
                    const res = await request(app).post(
                        `/api/reading/user/register?${query}`
                    )

                    expect(res.status).toBe(400)
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            "data must have required property 'firstName'"
                        )
                    )
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            "data must have required property 'lastName'"
                        )
                    )
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            "data must have required property 'email'"
                        )
                    )
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            "data must have required property 'password'"
                        )
                    )
                })
            })
            describe('GET api/reading/user/login', () => {})
            describe('GET api/reading/user/delete', () => {})
            describe('GET api/reading/user/update', () => {})

            // ***************************************************************
            // TODO: To be removed. Used for development
            describe('GET api/reading/user/all', () => {
                test('should respond status 200', async () => {
                    const res = await request(app).get('/api/reading/user/all')
                    expect(res.status).toBe(200)
                })
            })
            describe('GET api/reading/user/create-table', () => {})
            describe('GET api/reading/user/delete-table', () => {})
            // ***************************************************************
        })
        describe(' - BOOKS', () => {})
    })
})
