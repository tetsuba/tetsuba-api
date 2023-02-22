// Schema - Tracker
export default {
    type: Object,
    properties: {
        id: {
            type: 'Integer',
            description: 'Tracker id',
            example: '2'
        },
        userId: {
            type: 'Integer',
            description: 'A userId',
            example: 2
        },
        data: {
            type: 'String',
            description: 'Tracking data',
            example:
                "{ LibId: '001', bookId: 1, history: [{ date: '', words: [] }] }"
        }
    }
}
