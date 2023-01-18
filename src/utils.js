export function getValuesFrom(params) {
    return Object.values(params)
}

export const userTableName =
    process.env.NODE_ENV === 'test' ? 'userTest' : 'user'
