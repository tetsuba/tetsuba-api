import sqlite from '../../../../database/index.js'
import {
    SQL__CREATE_TABLE_USER,
    SQL__INSERT_INTO_USER,
    SQL__SELECT_ALL_USERS,
    SQL__DELETE_TABLE_USER
} from './sql.js'
import validate from '../../../../validator.js'
import { REGISTER_USER_SCHEMA } from './schema.js'
import { getValuesFrom } from '../../../../utils.js'

const PARAMS_NONE = []

export function registerNewUserHandler(req, res) {
    const errors = validate(REGISTER_USER_SCHEMA, req.query)
    if (errors) {
        res.status(400) // Bad Request
            .json({ error: { message: errors } })
    } else {
        sqlite()
            .run(
                SQL__INSERT_INTO_USER,
                getValuesFrom(req.query),
                function callback(err) {
                    if (err) {
                        res.status(500) // Internal Server Error
                            .json({
                                error: {
                                    message: err.message
                                }
                            })
                    } else {
                        res.status(201) // Created
                            .json({ success: 'User registered!' })
                    }
                }
            )
            .close()
    }
}

export function getAllUsersHandler(req, res) {
    sqlite()
        .all(SQL__SELECT_ALL_USERS, PARAMS_NONE, function callback(err, rows) {
            res.status(200).json(rows)
        })
        .close()
}

export function createTableHandler(req, res) {
    sqlite()
        .all(SQL__CREATE_TABLE_USER, PARAMS_NONE, function callback() {
            res.status(200).json({ message: 'CREATED' })
        })
        .close()
}

export function deleteTableHandler(req, res) {
    sqlite()
        .all(SQL__DELETE_TABLE_USER, PARAMS_NONE, function callback() {
            res.status(200).json({ message: 'DELETED' })
        })
        .close()
}
