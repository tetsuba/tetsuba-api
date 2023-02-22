const SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' }
    },
    required: ['userId'],
    additionalProperties: false
}

export default SCHEMA
