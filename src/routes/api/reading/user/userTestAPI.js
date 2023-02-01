import request from 'supertest'
import app from '../../../index.js'
import querystring from 'querystring'

export async function createUserTable() {
    return request(app)
        .put(`/api/reading/user/create-table`)
        .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
}

export async function deleteUserTable() {
    return request(app)
        .put(`/api/reading/user/delete-table`)
        .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
}

export async function loginUser(userCredentials) {
    return await request(app)
        .post(`/api/reading/user/login`)
        .send(userCredentials)
        .set('Accept', 'application/json')
}

export async function registerUser(data) {
    const query = querystring.stringify(data)
    return await request(app).post(`/api/reading/user/register?${query}`)
}
