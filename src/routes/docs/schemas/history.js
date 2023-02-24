// Schema - History
export default {
    type: Object,
    properties: {
        date: {
            type: 'String',
            description: 'The date saved',
            example: '12/12/12'
        },
        words: {
            type: 'array',
            description: 'The words incorrectly read',
            example: ['there', 'then']
        }
    }
}
