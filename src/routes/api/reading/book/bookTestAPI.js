import request from 'supertest'
import app from '../../../index.js'

export async function createBookTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/book/create-table`)
        .set('Authorization', token)
}

export async function deleteBookTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .delete(`/api/reading/book/delete-table`)
        .set('Authorization', token)
}

export async function registerBook(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/book/register`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function getAllBooks(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app).get('/api/reading/book/all').set('Authorization', token)
}

export async function getBook(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .get(`/api/reading/book${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}
export async function deleteBook(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .delete(`/api/reading/book/delete${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function editBook(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .put(`/api/reading/book/edit`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function updateBook(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .patch(`/api/reading/book/update`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function getWords(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .get(`/api/reading/book/words${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}
