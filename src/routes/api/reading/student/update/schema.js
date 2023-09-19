const UPDATE_STUDENT_SCHEMA = {
    type: 'object',
    properties: {
        studentId: { type: 'number' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        dob: { type: 'string' }
    },
    required: ['studentId', 'firstname', 'lastname', 'dob'],
    additionalProperties: false
}

export default UPDATE_STUDENT_SCHEMA
