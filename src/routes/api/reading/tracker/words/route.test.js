import {
    createTrackerTable,
    deleteTrackerTable,
    addTracker,
    updateTracker,
    getTrackerWords
} from '../trackerTestApi.js'

const UPDATE_DATA = {
    userId: 1,
    libId: '001',
    bookId: 1,
    history: [{ date: '12/12/12', words: ['word', 'word'] }]
}
const UPDATE_DATA_2 = {
    userId: 1,
    libId: '002',
    bookId: 2,
    history: [
        { date: '12/12/12', words: ['word', 'word'] },
        { date: '12/12/12', words: ['there', 'then'] }
    ]
}

describe('@GET /api/reading/tracker/words', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createTrackerTable()
            await addTracker({
                userId: 1
            })
            await addTracker({
                userId: 2
            })
        })
        afterAll(async () => {
            await deleteTrackerTable()
        })
        test('should respond with an empty array', async () => {
            const res = await getTrackerWords(query)
            expect(res.status).toBe(200)
            expect(res.text).toBe('[]')
        })
        test('should respond with a frequency of words when tracker is updated', async () => {
            await updateTracker(UPDATE_DATA)
            await updateTracker(UPDATE_DATA_2)
            const res = await getTrackerWords(query)
            expect(res.status).toBe(200)
            expect(res.text).toBe(
                '[{"word":"word","index":4},{"word":"there","index":1},{"word":"then","index":1}]'
            )
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getTrackerWords('')
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be integer')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getTrackerWords('', noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getTrackerWords(query)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
