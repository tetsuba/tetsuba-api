const EDIT_BOOK_SCHEMA = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        story: { type: 'string' },
        difficulty: { type: 'string' }
    },
    required: ['id', 'title', 'story', 'difficulty'],
    additionalProperties: false
}

export default EDIT_BOOK_SCHEMA
