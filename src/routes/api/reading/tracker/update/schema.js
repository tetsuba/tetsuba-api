const SCHEMA = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        data: { type: 'string' }
    },
    required: ['userId', 'data'],
    additionalProperties: false
}

export default SCHEMA
