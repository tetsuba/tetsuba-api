// Schema - Book
export default {
    type: Object,
    properties: {
        id: {
            type: 'Integer',
            description: 'Unique id for a book',
            example: 1
        },
        userId: {
            type: 'Integer',
            description: 'Which user registered the book',
            example: 33
        },
        title: {
            type: 'String',
            description: 'Title of the book',
            example: 'The title'
        },
        story: {
            type: 'String',
            description: 'The story of the book',
            example: 'Once upon a time...'
        },
        history: {
            type: 'String',
            description: 'JSON String. A readers history',
            example: '[{date: 12/12/12, words: three, their, people}]'
        }
    }
}
