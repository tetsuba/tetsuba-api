const BOOK_DELETE_SCHEMA = {
    type: 'object',
    properties: {
        id: { type: 'integer' }
    },
    required: ['id'],
    additionalProperties: false
}

export default BOOK_DELETE_SCHEMA
