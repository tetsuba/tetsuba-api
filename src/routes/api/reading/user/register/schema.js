const REGISTER_USER_SCHEMA = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            pattern: '^[a-zA-Z]'
        },
        lastName: {
            type: 'string',
            pattern: '^[a-zA-Z]'
        },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    errorMessage: {
        properties: {
            firstName: 'First letter must be a character',
            lastName: 'First letter must be a character'
        }
    },
    required: ['firstName', 'lastName', 'email', 'password'],
    additionalProperties: false
}

export default REGISTER_USER_SCHEMA
