import {
    createBookTable,
    deleteBookTable,
    registerBook
} from '../../book/bookTestAPI.js'
import { updateBook } from '../../book/bookTestAPI.js'
import { getSightWords } from '../sightWordsTestApi.js'

const UPDATE_BOOK_HISTORY_DATA = {
    id: 1,
    history: JSON.stringify([{ date: '12/12/12', words: ['my', 'story'] }])
}

describe('@GET /api/reading/sightWords', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook({
                userId: 1,
                title: 'title',
                story: 'This is a story'
            })
            await registerBook({
                userId: 1,
                title: 'title',
                story: 'My story is about a horse'
            })
            await registerBook({
                userId: 1,
                title: 'title',
                story: 'There is a story about a dog and a cat'
            })
            await updateBook(UPDATE_BOOK_HISTORY_DATA)
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should respond with all books with the same userId', async () => {
            const res = await getSightWords(query)
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveProperty('sightWordsFromBooks')
            expect(data).toHaveProperty('sightWordsNotInBooks')
            expect(data).toHaveProperty('sightWordsReadInBooks')
            expect(data).toHaveProperty('sightWordsReadWrong')
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
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getSightWords(query)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
