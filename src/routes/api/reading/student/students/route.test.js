import {
    createStudentTable,
    deleteStudentTable,
    getStudents,
    registerStudent
} from '../studentTestAPI.js'

import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'

describe('@GET /api/reading/student', () => {
    const query = '?userId=1'
    describe('status: 200', () => {
        beforeAll(async () => {
            await createStudentTable()
            await registerStudent({
                userId: 1,
                firstname: 'John',
                lastname: 'Bill',
                dob: '2012-12-12'
            })
            await registerStudent({
                userId: 1,
                firstname: 'David',
                lastname: 'Paul',
                dob: '2000-12-12'
            })
        })
        afterAll(async () => {
            await deleteStudentTable()
        })
        test('should respond with two students', async () => {
            const res = await getStudents(query)
            const data = JSON.parse(res.text)
            expect(res.status).toBe(200)
            expect(data).toHaveLength(2)
        })
    })
    describe('status: 400', () => {
        test('empty query string', async () => {
            const res = await getStudents('')
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
            const res = await getStudents('', noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await getStudents(query)
            toExpect500Status(res)
        })
    })
})
