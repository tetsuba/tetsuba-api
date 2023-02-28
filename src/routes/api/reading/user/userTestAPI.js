import request from 'supertest'
import app from '../../../index.js'
import querystring from 'querystring'

export async function createUserTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/user/create-table`)
        .set('Authorization', token)
}

export async function deleteUserTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .delete(`/api/reading/user/delete-table`)
        .set('Authorization', token)
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

export async function getAllUsers(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app).get('/api/reading/user/all').set('Authorization', token)
}
