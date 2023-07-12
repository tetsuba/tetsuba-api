import {
    createBookTable,
    deleteBookTable,
    registerBook
} from '../bookTestAPI.js'
import {
    addTracker,
    createTrackerTable,
    deleteTrackerTable
} from '../../tracker/trackerTestApi.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

const BOOK_DATA = {
    userId: 1,
    title: 'A new story',
    story: ['Once upon a time.', 'There was a whale.']
}

describe('@POST /api/reading/book/register', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createBookTable()
            await createTrackerTable()
            await addTracker({ userId: 1 })
        })
        afterAll(async () => {
            await deleteBookTable()
            await deleteTrackerTable()
        })
        test('should register a book', async () => {
            const res = await registerBook(BOOK_DATA)
            expect(res.status).toBe(201)
            const data = JSON.parse(res.text)
            expect(data[0].books).toEqual([
                { ...BOOK_DATA, id: 1, history: null }
            ])
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await registerBook({})
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'userId', data must have required property 'title', data must have required property 'story'"
            })
        })
        test('with userId as a string', async () => {
            const res = await registerBook({ ...BOOK_DATA, userId: '011' })
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
            const res = await registerBook({
                ...BOOK_DATA,
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
            const res = await registerBook({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await registerBook(BOOK_DATA)
            toExpect500Status(res)
        })
    })
})
