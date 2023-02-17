import {
    createBookTable,
    deleteBookTable,
    getWords,
    registerBook,
    updateBook
} from '../bookTestAPI.js'

const UPDATE_HISTORY_1 = {
    id: 1,
    history: JSON.stringify([
        { date: '12/12/12', words: ['tomorrow', 'word'] },
        { date: '12/12/12', words: ['door', 'word'] },
        { date: '12/12/12', words: ['word', 'long'] },
        { date: '12/12/12', words: ['this', 'that'] },
        { date: '12/12/12', words: [] }
    ])
}

describe('@GET /api/reading/book/words', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
            await registerBook({
                userId: 1,
                title: 'title',
                story: 'story'
            })
            await registerBook({
                userId: 1,
                title: 'title 2',
                story: 'story 2'
            })
            await updateBook(UPDATE_HISTORY_1)
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('should respond with a list of words', async () => {
            const res = await getWords(query)
            const data = JSON.parse(res.text)
            expect(data).toHaveLength(6)
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getWords('')
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be integer')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await getWords('', noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getWords(query)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
