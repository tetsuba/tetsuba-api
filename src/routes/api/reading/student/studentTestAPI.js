import request from 'supertest'
import app from '../../../index.js'

export async function createStudentTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/student/create-table`)
        .set('Authorization', token)
}

export async function deleteStudentTable(noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .delete(`/api/reading/student/delete-table`)
        .set('Authorization', token)
}

export async function registerStudent(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .post(`/api/reading/student/register`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function getStudents(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .get(`/api/reading/student${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}
export async function deleteStudent(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .delete(`/api/reading/student/delete${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}

export async function updateStudent(json, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .patch(`/api/reading/student/update`)
        .send(json)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}
