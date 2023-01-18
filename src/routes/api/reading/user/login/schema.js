const LOGIN_USER_SCHEMA = {
    type: 'object',
    properties: {
        username: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['username', 'password'],
    additionalProperties: false
}

export default LOGIN_USER_SCHEMA
