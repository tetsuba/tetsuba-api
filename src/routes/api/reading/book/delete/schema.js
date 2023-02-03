const BOOK_DELETE_SCHEMA = {
    type: 'object',
    properties: {
        bookId: { type: 'integer' }
    },
    required: ['bookId'],
    additionalProperties: false
}

export default BOOK_DELETE_SCHEMA
