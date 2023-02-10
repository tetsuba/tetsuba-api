const REGISTER_BOOK_SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        title: { type: 'string' },
        story: { type: 'string' }
    },
    required: ['userId', 'title', 'story'],
    additionalProperties: false
}

export default REGISTER_BOOK_SCHEMA
