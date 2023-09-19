const STUDENT_SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'integer' }
    },
    required: ['userId'],
    additionalProperties: false
}

export default STUDENT_SCHEMA
