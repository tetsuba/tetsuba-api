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
            expect(res.text).toEqual('{"message":"New Tracker Added"}')
            expect(res.status).toBe(201)
        })
    })
    describe('status: 400', () => {
        test('with no properties', async () => {
            const res = await addTracker({})
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    "data must have required property 'userId'"
                )
            )
        })
        test('with userId as a string', async () => {
            const res = await addTracker({ userId: '011' })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining('userId must be number')
            )
        })
        test('with an additional property', async () => {
            const res = await addTracker({
                ...mockData,
                newProperty: 'something'
            })
            expect(res.status).toBe(400)
            expect(res.text).toEqual(
                expect.stringContaining(
                    'data must NOT have additional properties'
                )
            )
        })
    })
    describe('status: 401', () => {
        test('with no Bearer token', async () => {
            const noToken = true
            const res = await addTracker({}, noToken)
            expect(res.text).toEqual(expect.stringContaining('Not authorized'))
            expect(res.status).toBe(401)
        })
    })
    describe('status: 500', () => {
        test('should respond with an error if table does not exist', async () => {
            const res = await addTracker(mockData)
            expect(res.status).toBe(500)
            expect(res.text).toEqual(expect.stringContaining('SQLITE_ERROR'))
        })
    })
})
