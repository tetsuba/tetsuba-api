import {
    toExpect401Status,
    toExpect500Status
} from '../../../../../setup-tests.js'
import {
    createStudentTable,
    deleteStudentTable,
    registerStudent,
    updateStudent
} from '../studentTestAPI.js'

const STUDENT_DATA = {
    userId: 1,
    firstname: 'Bill',
    lastname: 'Bob',
    dob: '2012-12-12'
}

const UPDATED_STUDENT_DATA = {
    studentId: 1,
    firstname: 'Ted',
    lastname: 'Ted',
    dob: '2012-12-18',
    progress: '[{"date": "12-12-12", "words": []}]'
}

describe('@PUT /api/reading/student/update', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createStudentTable()
            await registerStudent(STUDENT_DATA)
        })
        afterAll(async () => {
            await deleteStudentTable()
        })
        test('should update a student', async () => {
            const res = await updateStudent(UPDATED_STUDENT_DATA)
            const data = JSON.parse(res.text)
            expect(data).toEqual([
                {
                    studentId: 1,
                    firstname: 'Ted',
                    lastname: 'Ted',
                    dob: '2012-12-18',
                    progress: [{ date: '12-12-12', words: [] }]
                }
            ])
            expect(res.status).toBe(200)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await updateStudent({})
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'studentId', data must have required property 'firstname', data must have required property 'lastname', data must have required property 'dob', data must have required property 'progress'"
            })
        })
        test('with studentId as a string', async () => {
            const res = await updateStudent({
                ...UPDATED_STUDENT_DATA,
                studentId: '011'
            })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/studentId must be number'
            })
        })
        test('with an additional property', async () => {
            const res = await updateStudent({
                ...UPDATED_STUDENT_DATA,
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
            const res = await updateStudent({}, noToken)
            toExpect401Status(res)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await updateStudent(UPDATED_STUDENT_DATA)
            toExpect500Status(res)
        })
    })
})
