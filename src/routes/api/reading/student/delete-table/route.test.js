import { createStudentTable, deleteStudentTable } from '../studentTestAPI.js'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

describe('@PUT /api/reading/student/delete-table', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createStudentTable()
        })
        test('should delete a student table', async () => {
            const res = await deleteStudentTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('Student Table Deleted')
            )
        })
    })
    describe('status: 401', () => {
        beforeAll(async () => {
            await createStudentTable()
        })
        afterAll(async () => {
            await deleteStudentTable()
        })
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteStudentTable(noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should error if no student table exists', async () => {
            const res = await deleteStudentTable()
            toExpect500Status(res)
        })
    })
})
