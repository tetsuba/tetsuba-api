import { createBookTable, deleteBookTable } from '../bookTestAPI.js'

describe('@PUT /api/reading/book/delete-table', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createBookTable()
        })
        test('should delete a user table', async () => {
            const res = await deleteBookTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('Book Table Deleted')
            )
        })
    })
    describe('status: 401', () => {
        beforeAll(async () => {
            await createBookTable()
        })
        afterAll(async () => {
            await deleteBookTable()
        })
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteBookTable(noToken)
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
    describe('status: 500', () => {
        test('should error if no user table exists', async () => {
            const res = await deleteBookTable()
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
