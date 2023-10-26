export default {
    type: Object,
    properties: {
        studentId: {
            type: 'Integer',
            description: 'Unique id for a student',
            example: 1
        },
        firstname: {
            type: 'String',
            description: "Student's first name",
            example: 'Bob'
        },
        lastname: {
            type: 'String',
            description: "Student's last name",
            example: 'Smith'
        },
        dob: {
            type: 'String',
            description: "Student's date of birth",
            example: '12/12/12'
        },
        userId: {
            type: 'Integer',
            description: 'Identify which user the student belongs too',
            example: 1
        },
        progress: {
            type: 'Array',
            description: 'Stores data about the students progress',
            example: [
                {
                    LibId: '001',
                    bookId: 1,
                    history: [{ date: '12/12/12', words: ['word'] }]
                },
                {
                    LibId: '001',
                    bookId: 2,
                    history: [{ date: '12/12/12', words: [] }]
                }
            ]
        }
    }
}
