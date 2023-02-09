// Schema - Internal Server Error
export default {
    type: Object,
    properties: {
        message: {
            type: 'String',
            description: 'This will be a sqlite error',
            example: 'SQLITE_ERROR'
        }
    }
}
