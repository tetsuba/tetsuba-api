const UPDATE_BOOK_SCHEMA = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        history: { type: 'string' }
    },
    required: ['id', 'history'],
    additionalProperties: false
}

export default UPDATE_BOOK_SCHEMA
