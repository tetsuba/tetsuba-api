import {
    createTrackerTable,
    deleteTrackerTable,
    addTracker,
    updateTracker
} from '../trackerTestApi.js'

const UPDATE_DATA = {
    userId: 1,
    data: JSON.stringify([
        {
            LibId: '001',
            bookId: 1,
            history: { date: '12/12/12', words: ['word', 'word'] }
        }
    ])
}

describe('@PATCH /api/reading/tracker/update', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createTrackerTable()
            await addTracker({ userId: 1 })
        })
        afterAll(async () => {
            await deleteTrackerTable()
        })
        test('should update the history in a book', async () => {
            const res = await updateTracker(UPDATE_DATA)
            // const data = JSON.parse(res.text)
            // expect(data[0].history).toEqual(UPDATE_BOOK_HISTORY_DATA.history)
            expect(res.status).toBe(200)
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
                    "data must have required property 'data'"
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
