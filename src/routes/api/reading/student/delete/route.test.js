import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'
import {
    createStudentTable,
    deleteStudent,
    deleteStudentTable,
    registerStudent
} from '../studentTestAPI.js'

const mockQuery = '?studentId=2'

describe('@DELETE /api/reading/student/delete', () => {
    describe('status: 200', () => {
        beforeAll(async () => {
            await createStudentTable()
            await registerStudent({
                userId: 1,
                firstname: 'ted',
                lastname: 'bob',
                dob: '2012-12-12'
            })
            await registerStudent({
                userId: 1,
                firstname: 'bill',
                lastname: 'bob',
                dob: '2012-12-12'
            })
        })
        afterAll(async () => {
            await deleteStudentTable()
        })
        test('should delete a student', async () => {
            const res = await deleteStudent(mockQuery)
            const data = JSON.parse(res.text)
            expect(data).toHaveLength(1)
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('query as an empty string', async () => {
            const res = await deleteStudent('')
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/studentId must be integer'
            })
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await deleteStudent({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await deleteStudent(mockQuery)
            toExpect500Status(res)
        })
    })
})
