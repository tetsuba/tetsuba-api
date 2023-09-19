const REGISTER_STUDENT_SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        dob: { type: 'string' }
    },
    required: ['userId', 'firstname', 'lastname', 'dob'],
    additionalProperties: false
}

export default REGISTER_STUDENT_SCHEMA
