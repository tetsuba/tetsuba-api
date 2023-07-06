import { createBookTable, deleteBookTable } from '../../book/bookTestAPI.js'
import { getSightWords } from '../sightWordsTestApi.js'
import {
    addTracker,
    createTrackerTable,
    deleteTrackerTable,
    updateTracker
} from '../../tracker/trackerTestApi.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

const UPDATE_DATA = {
    userId: 1,
    libId: '002',
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

describe('@GET /api/reading/sightWords', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await createTrackerTable()
            await addTracker({ userId: 1 })
        })
        afterAll(async () => {
            await deleteBookTable()
            await deleteTrackerTable()
        })
        test('should respond with four groups of sight words', async () => {
            const res = await getSightWords(query)
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveProperty('sightWordsFromBooks')
            expect(data).toHaveProperty('sightWordsNotInBooks')
            expect(data).toHaveProperty('sightWordsReadInBooks')
            expect(data).toHaveProperty('sightWordsReadWrong')
            expect(data.sightWordsReadWrong).toHaveLength(0)
            expect(data.sightWordsReadInBooks).toHaveLength(0)
        })
        test('should respond with sight words been read', async () => {
            await updateTracker(UPDATE_DATA)
            await updateTracker(UPDATE_DATA_2)
            const res = await getSightWords(query)
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data.sightWordsReadWrong).toHaveLength(2)
            expect(data.sightWordsReadInBooks).toHaveLength(9)
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getSightWords('')
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be integer')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getSightWords('', noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if book table does not exist', async () => {
            const res = await getSightWords(query)
            toExpect500Status(res)
        })

        test('should respond with an error if tracker table does not exist', async () => {
            await createBookTable()
            const res = await getSightWords(query)
            toExpect500Status(res)
            await deleteBookTable()
        })
    })
})
