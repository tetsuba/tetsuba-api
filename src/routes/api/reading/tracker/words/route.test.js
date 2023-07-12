import {
    createTrackerTable,
    deleteTrackerTable,
    addTracker,
    updateTracker,
    getTrackerWords
} from '../trackerTestApi.js'
import moment from 'moment'
import {
    createBookTable,
    deleteBookTable,
    registerBook
} from '../../book/bookTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

const UPDATE_DATA = {
    userId: 1,
    libId: '001',
    bookId: 1,
    history: [
        {
            date: moment().subtract(2, 'days').format('DD/MM/YYYY'),
            words: ['here', 'hair']
        }
    ]
}
const UPDATE_DATA_2 = {
    userId: 1,
    libId: '002',
    bookId: 2,
    history: [
        {
            date: moment().subtract(20, 'days').format('DD/MM/YYYY'),
            words: ['been', 'seen']
        },
        {
            date: moment().subtract(40, 'days').format('DD/MM/YYYY'),
            words: ['there', 'then']
        }
    ]
}

describe('@GET /api/reading/tracker/words', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook({
                userId: 1,
                title: 'new book',
                story: ['This is a story']
            })
            await createTrackerTable()
            await addTracker({
                userId: 1
            })
            await addTracker({
                userId: 2
            })
        })
        afterAll(async () => {
            await deleteBookTable()
            await deleteTrackerTable()
        })
        test('should respond with an empty array', async () => {
            const res = await getTrackerWords(query)
            expect(res.status).toBe(200)
            expect(res.text).toBe(
                '{"readIncorrectly":{"oneWeekAgo":[],"oneMonthAgo":[],"history":[]},"lastBookRead":[]}'
            )
        })
        test('should respond with a frequency of words when tracker is updated', async () => {
            await updateTracker(UPDATE_DATA)
            await updateTracker(UPDATE_DATA_2)
            const res = await getTrackerWords(query)
            expect(res.status).toBe(200)
            const data = JSON.parse(res.text)
            expect(data.readIncorrectly.oneWeekAgo).toEqual([
                { word: 'here', index: 1 },
                { word: 'hair', index: 1 }
            ])
            expect(data.readIncorrectly.oneMonthAgo).toEqual([
                { word: 'been', index: 1 },
                { word: 'seen', index: 1 }
            ])
            expect(data.readIncorrectly.history).toEqual([
                { word: 'there', index: 1 },
                { word: 'then', index: 1 }
            ])
            expect(data.lastBookRead).toHaveLength(1)
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getTrackerWords('')
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/userId must be integer'
            })
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getTrackerWords('', noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if Tracker table does not exist', async () => {
            const res = await getTrackerWords(query)
            toExpect500Status(res)
        })
        test('should respond with an error if Book table does not exist', async () => {
            await createTrackerTable()
            const res = await getTrackerWords(query)
            toExpect500Status(res)
            await deleteTrackerTable()
        })
    })
})
