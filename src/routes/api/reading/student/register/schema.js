const REGISTER_STUDENT_SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        firstname: { type: 'string', minLength: 1 },
        lastname: { type: 'string', minLength: 1 },
        dob: { type: 'string', format: `date` }
    },
    required: ['userId', 'firstname', 'lastname', 'dob'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            dob: 'date format should be yyyy-mm-dd'
        }
    }
}

export default REGISTER_STUDENT_SCHEMA
