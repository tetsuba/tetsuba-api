const BOOK_SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'integer' }
    },
    required: ['userId'],
    additionalProperties: false
}

export default BOOK_SCHEMA
