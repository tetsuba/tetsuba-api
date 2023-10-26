export function getValuesFrom(params) {
    return Object.values(params)
}

/* istanbul ignore next */
export function tableName(text) {
    return process.env.NODE_ENV === 'test' ? `${text}Test` : text
}

export function parseStudentProgress(rows) {
    return rows.map((data) => ({
        ...data,
        progress: JSON.parse(data.progress)
    }))
}
