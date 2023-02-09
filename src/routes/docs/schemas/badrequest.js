// Schema - Bad Request
export default {
    type: Object,
    properties: {
        message: {
            type: 'String',
            description: 'Data sent is incorrect or missing',
            example: 'data must have required property id'
        }
    }
}
