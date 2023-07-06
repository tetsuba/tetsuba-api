import {
    createTrackerTable,
    deleteTrackerTable,
    addTracker,
    updateTracker
} from '../trackerTestApi.js'
import { createBookTable, deleteBookTable } from '../../book/bookTestAPI.js'

const UPDATE_DATA = {
    userId: 1,
    libId: '002',
    bookId: 1,
    history: [{ date: '12/12/12', words: ['word', 'word'] }]
}
const UPDATE_DATA_2 = {
    userId: 1,
    libId: '002',
    bookId: 1,
    history: [
        { date: '12/12/12', words: ['word', 'word'] },
        { date: '12/12/12', words: ['there', 'then'] }
    ]
}

const UPDATE_DATA_3 = {
    userId: 1,
    libId: '002',
    bookId: 2,
    history: [{ date: '12/12/12', words: ['live', 'give'] }]
}

describe('@PATCH /api/reading/tracker/update', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await createTrackerTable()
            await addTracker({ userId: 1 })
        })
        afterAll(async () => {
            await deleteTrackerTable()
            await deleteBookTable()
        })
        test('should update the history in a book', async () => {
            const res = await updateTracker(UPDATE_DATA)
            const data = JSON.parse(res.text)
            expect(data[1].books[0].history).toEqual(UPDATE_DATA.history)
            expect(res.status).toBe(200)

            const res2 = await updateTracker(UPDATE_DATA_2)
            const data2 = JSON.parse(res2.text)
            expect(data2[1].books[0].history).toEqual(UPDATE_DATA_2.history)
            expect(res2.status).toBe(200)

            const res3 = await updateTracker(UPDATE_DATA_3)
            const data3 = JSON.parse(res3.text)
            expect(data3[1].books[1].history).toEqual(UPDATE_DATA_3.history)
            expect(res3.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await updateTracker({})
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'userId', data must have required property 'history', data must have required property 'libId', data must have required property 'bookId'"
            })
        })
        test('with id as a string', async () => {
            const res = await updateTracker({
                ...UPDATE_DATA,
                userId: '011'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/userId must be number'
            })
        })
        test('with an additional property', async () => {
            const res = await updateTracker({
                ...UPDATE_DATA,
                newProperty: 'something'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data must NOT have additional properties'
            })
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await updateTracker({}, noToken)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(401)
            expect(json).toEqual({
                success: false,
                status: 401,
                message: 'Unauthorized',
                stack: ''
            })
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await updateTracker(UPDATE_DATA)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: json.stack
            })
        })

        test('should respond with an error if table does not exist', async () => {
            const res = await updateTracker(UPDATE_DATA)
            const json = JSON.parse(res.text)
            expect(res.status).toBe(500)
            expect(json).toEqual({
                success: false,
                status: 500,
                message: 'Internal Server Error',
                stack: json.stack
            })
        })
    })
})
