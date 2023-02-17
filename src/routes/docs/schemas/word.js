// Schema - Word
export default {
    type: Object,
    properties: {
        word: {
            type: 'String',
            description: 'A word a user read incorrectly',
            example: 'there'
        },
        index: {
            type: 'Integer',
            description:
                'The number of times a reader read the word incorrectly',
            example: 2
        }
    }
}
