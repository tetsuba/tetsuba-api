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
    describe.skip('status: 500', () => {
        test('should return an error if a book table is created already', async () => {
            const res = await createBookTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
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
