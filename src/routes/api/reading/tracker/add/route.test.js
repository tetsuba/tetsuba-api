import {
    createTrackerTable,
    deleteTrackerTable,
    addTracker
} from '../trackerTestApi'

const mockData = {
    userId: 1
}

describe('@POST /api/reading/tracker/add', () => {
    describe('status: 201', () => {
        beforeAll(async () => {
            await createTrackerTable()
        })
        afterAll(async () => {
            await deleteTrackerTable()
        })
        test('should add a new tracker', async () => {
            const res = await addTracker(mockData)
            // expect(res.text).toEqual('{"message":"New Tracker Added"}')
            expect(res.status).toBe(201)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await addTracker()
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: "data must have required property 'userId'"
            })
        })
        test('with userId as a string', async () => {
            const res = await addTracker({ userId: '011' })
            const json = JSON.parse(res.text)
            expect(res.status).toBe(400)
            expect(json).toEqual({
                success: false,
                status: 400,
                message: 'Bad request',
                stack: 'data/userId must be number'
            })
        })
        test('with an additional property', async () => {
            const res = await addTracker({
                ...mockData,
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
            const res = await addTracker({}, noToken)
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
        test('should respond with an error if table does not exist', async () => {
            const res = await addTracker(mockData)
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
