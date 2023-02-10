const EDIT_BOOK_SCHEMA = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        story: { type: 'string' }
    },
    required: ['id', 'title', 'story'],
    additionalProperties: false
}

export default EDIT_BOOK_SCHEMA
