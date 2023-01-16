/* istanbul ignore next */
const user = process.env.NODE_ENV === 'test' ? 'userTest' : 'user'

export const SQL__CREATE_TABLE_USER = `
    CREATE TABLE IF NOT EXISTS ${user} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        CONSTRAINT email_unique UNIQUE (email)
    )
`

export const SQL__DELETE_TABLE_USER = `
  DROP TABLE ${user}
`

// Create a new user
export const SQL__INSERT_INTO_USER = `
  INSERT INTO ${user}(firstName, lastName, email, password) values (?,?,?,?)
`

// This is for the admin to see if there are any errors with the data
export const SQL__SELECT_ALL_USERS = `
  SELECT * FROM ${user}
`
