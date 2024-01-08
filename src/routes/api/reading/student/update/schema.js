const UPDATE_STUDENT_SCHEMA = {
    type: 'object',
    properties: {
        studentId: { type: 'number' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        dob: { type: 'string' },
        progress: { type: ['string', 'null'] }
    },
    required: ['studentId', 'firstname', 'lastname', 'dob', 'progress'],
    additionalProperties: false
}

export default UPDATE_STUDENT_SCHEMA
