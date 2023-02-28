const SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        libId: { type: 'string' },
        bookId: { type: 'number' },
        history: { type: 'array' }
    },
    required: ['userId', 'history', 'libId', 'bookId'],
    additionalProperties: false
}

export default SCHEMA
