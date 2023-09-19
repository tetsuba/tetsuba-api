const BOOK_DELETE_SCHEMA = {
    type: 'object',
    properties: {
        studentId: { type: 'integer' }
    },
    required: ['studentId'],
    additionalProperties: false
}

export default BOOK_DELETE_SCHEMA
