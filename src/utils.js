export function getValuesFrom(params) {
    return Object.values(params)
}

export function tableName(text) {
    return process.env.NODE_ENV === 'test' ? `${text}Test` : text
}
