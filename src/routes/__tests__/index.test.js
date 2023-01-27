import request from 'supertest'
import app from '../index'
import querystring from 'querystring'

describe('Routes', () => {
    describe('@READING', () => {
        let token = ''
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
            describe('POST api/reading/user/login', () => {
                test('should respond with a user authenticated', async () => {
                    const res = await request(app)
                        .post(`/api/reading/user/login`)
                        .send({ username: 'bob@bob.com', password: '123456' })
                        .set('Accept', 'application/json')

                    const expectedResponse = JSON.parse(res.text)
                    expect(res.status).toBe(200)
                    expect(expectedResponse).toHaveProperty('token')
                    expect(expectedResponse).toHaveProperty('data')

                    /* NOTE:
                     * This token is required for 'GET api/reading/user'
                     * */
                    token = expectedResponse.token
                })
                test('should respond with an 400 error', async () => {
                    const res = await request(app)
                        .post(`/api/reading/user/login`)
                        .send({ username: 'bob@bob.com', p: '123' })
                        .set('Accept', 'application/json')

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
                test('should respond with an 500 error [incorrect password]', async () => {
                    const res = await request(app)
                        .post(`/api/reading/user/login`)
                        .send({ username: 'bob@bob.com', password: '1' })
                        .set('Accept', 'application/json')

                    expect(res.status).toBe(500)
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            'Incorrect username or password'
                        )
                    )
                })
                test('should respond with an 500 error [incorrect email]', async () => {
                    const res = await request(app)
                        .post(`/api/reading/user/login`)
                        .send({ username: 'bob22@bob.com', password: '123456' })
                        .set('Accept', 'application/json')

                    expect(res.status).toBe(500)
                    expect(res.text).toEqual(
                        expect.stringContaining(
                            'Incorrect username or password'
                        )
                    )
                })
            })
            describe('GET api/reading/user', () => {
                test('should respond with a 200', async () => {
                    const res = await request(app)
                        .get(`/api/reading/user`)
                        .set('Authorization', `Bearer ${token}`)

                    const expectedResponse = JSON.parse(res.text)
                    expect(res.status).toBe(200)
                    expect(expectedResponse).toHaveProperty('firstName')
                    expect(expectedResponse).toHaveProperty('lastName')
                    expect(expectedResponse).toHaveProperty('id')
                    expect(expectedResponse).toHaveProperty('email')
                })
                test('should respond with a 500', async () => {
                    const tokenWithWrongEmail =
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjc0ODU3ODIxfQ.LZJ-RgP0_UwhPDmBC96il3A369-OOsrZE5EEcvX2eVE'
                    const res = await request(app)
                        .get(`/api/reading/user`)
                        .set('Authorization', `Bearer ${tokenWithWrongEmail}`)

                    expect(res.status).toBe(500)
                    expect(res.text).toEqual(
                        expect.stringContaining('Not authorized')
                    )
                })
                test('should respond with an 401 error [No Bearer token]', async () => {
                    const res = await request(app).get(`/api/reading/user`)

                    expect(res.status).toBe(401)
                    expect(res.text).toEqual(
                        expect.stringContaining('Not authorized')
                    )
                })
                test('should respond with an 401 error [Incorrect Bearer token]', async () => {
                    const res = await request(app)
                        .get(`/api/reading/user`)
                        .set('Authorization', `Bearer sdklfjskdfjsdkfjl`)

                    expect(res.status).toBe(401)
                    expect(res.text).toEqual(
                        expect.stringContaining('Not authorized')
                    )
                })
            })
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
