const REGISTER_BOOK_SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        title: { type: 'string' },
        story: { type: 'string' },
        difficulty: { type: 'string' }
    },
    // errorMessage: {
    //     properties: {
    //         firstName: 'First letter must be a character',
    //         lastName: 'First letter must be a character'
    //     }
    // },
    required: ['userId', 'title', 'story', 'difficulty'],
    additionalProperties: false
}

export default REGISTER_BOOK_SCHEMA
