import request from 'supertest'
import app from '../../../index.js'

export async function getSightWords(query, noToken) {
    const token = noToken ? '' : `Bearer ${process.env.BEARER_TOKEN}`
    return request(app)
        .get(`/api/reading/sightWords${query}`)
        .set('Accept', 'application/json')
        .set('Authorization', token)
}
