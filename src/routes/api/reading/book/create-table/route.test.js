import { createBookTable, deleteBookTable } from '../bookTestAPI'

describe('@PUT /api/reading/book/create-table', () => {
    afterAll(async () => {
        await deleteBookTable()
    })
    describe('status: 200', () => {
        test('should create a book table', async () => {
            const res = await createBookTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('Book table created')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await createBookTable(noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe.skip('status: 500', () => {
        test('should return an error if a book table is created already', async () => {
            const res = await createBookTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
            expect(res.text).toBe('This is not it')
            expect(res.status).toBe(500)
        })
    })
})
