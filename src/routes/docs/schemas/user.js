// Schema - User
export default {
    type: Object,
    properties: {
        id: {
            type: 'Integer',
            description: 'Unique id for a User',
            example: 1
        },
        email: {
            type: 'String',
            description: 'User email address',
            example: 'bob@bob.com'
        },
        firstName: {
            type: 'String',
            description: 'User first name',
            example: 'Bob'
        },
        lastName: {
            type: 'String',
            description: 'User last name',
            example: 'Bob'
        }
    }
}
