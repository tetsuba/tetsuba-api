import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'
import {
    createStudentTable,
    deleteStudentTable,
    registerStudent
} from '../studentTestAPI.js'

const STUDENT_DATA = {
    userId: 1,
    firstname: 'John',
    lastname: 'Bob',
    dob: '2000-12-31'
}

describe('@POST /api/reading/student/register', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createStudentTable()
        })
        afterAll(async () => {
            await deleteStudentTable()
        })
        test('should register a student', async () => {
            const res = await registerStudent(STUDENT_DATA)
            expect(res.status).toBe(201)
            const data = JSON.parse(res.text)
            expect(data).toEqual([
                { ...STUDENT_DATA, studentId: 1, progress: null }
            ])
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await registerStudent({})
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'userId', data must have required property 'firstname', data must have required property 'lastname', data must have required property 'dob'"
            })
        })
        test('with userId as a string', async () => {
            const res = await registerStudent({
                ...STUDENT_DATA,
                userId: '011'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/userId must be number'
            })
        })
        test('with an incorrect date format', async () => {
            const res = await registerStudent({
                ...STUDENT_DATA,
                dob: '12-03-2000'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/dob date format should be yyyy-mm-dd'
            })
        })
        test('with an additional property', async () => {
            const res = await registerStudent({
                ...STUDENT_DATA,
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
            const res = await registerStudent({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await registerStudent(STUDENT_DATA)
            toExpect500Status(res)
        })
    })
})
