// Schema - Collection
export default {
    type: Object,
    properties: {
        id: {
            type: 'Integer',
            description: 'Unique id for a book',
            example: 1
        },
        author: {
            type: 'String',
            description: 'Author of the books',
            example: 'Ladybird'
        },
        title: {
            type: 'String',
            description: 'Title of the collection',
            example: 'The title'
        },
        description: {
            type: 'String',
            description: 'A quick description of the collection',
            example: ''
        },
        books: {
            type: 'Array',
            description: 'An array of books',
            example: [
                {
                    id: 1,
                    title: 'title',
                    story: ['This is a sentence.', 'This is a sentence.'],
                    history: ''
                },
                {
                    id: 2,
                    title: 'title',
                    story: ['This is a sentence.', 'This is a sentence.'],
                    history: ''
                }
            ]
        }
    }
}
