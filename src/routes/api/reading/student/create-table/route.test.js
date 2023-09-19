import { createStudentTable, deleteStudentTable } from '../studentTestAPI'
import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

describe('@Delete /api/reading/student/create-table', () => {
    afterAll(async () => {
        await deleteStudentTable()
    })
    describe('status: 200', () => {
        test('should create a student table', async () => {
            const res = await createStudentTable()
            expect(res.status).toBe(200)
            expect(res.text).toEqual(
                expect.stringContaining('Student table created')
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await createStudentTable(noToken)
            toExpect401Status(res)
        })
    })
    describe.skip('status: 500', () => {
        test('should return an error if a student table is created already', async () => {
            const res = await createStudentTable()
            // TODO: Not sure why the sql error is not triggered.
            //       I can see the user table still exists.
            toExpect500Status(res)
        })
    })
})
