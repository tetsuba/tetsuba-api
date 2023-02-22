import request from 'supertest'
import app from '../../../index.js'

export async function createTrackerTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/tracker/create-table`)
        .set('Authorization', token)
}

export async function deleteTrackerTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .delete(`/api/reading/tracker/delete-table`)
        .set('Authorization', token)
}

export async function addTracker(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/tracker/add`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function getTracker(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .get(`/api/reading/tracker${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function updateTracker(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .patch(`/api/reading/tracker/update`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}
