const SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'integer' }
    },
    required: ['userId'],
    additionalProperties: false
}

export default SCHEMA
