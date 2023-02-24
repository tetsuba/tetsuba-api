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
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'userId'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'history'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'bookId'"
                )
            )
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'libId'"
                )
            )
        })
        test('with id as a string', async () => {
            const res = await updateTracker({
                ...UPDATE_DATA,
                userId: '011'
            })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be number')
            )
        })
        test('with an additional property', async () => {
            const res = await updateTracker({
                ...UPDATE_DATA,
                newProperty: 'something'
            })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    'data must NOT have additional properties'
                )
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await updateTracker({}, noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await updateTracker(UPDATE_DATA)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
