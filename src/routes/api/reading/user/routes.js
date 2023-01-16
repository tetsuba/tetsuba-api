import express from 'express'
import {
    getAllUsersHandler,
    registerNewUserHandler,
    createTableHandler,
    deleteTableHandler
} from './handlers.js'
const router = express.Router()

router.post('/register', registerNewUserHandler)
/**
 * @swagger
 *
 * /api/reading/user/register:
 *   post:
 *     description: Register a new user
 *     tags:
 *       - Reading APP
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: user's first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: user's last name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: user's email address
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: user's chosen password
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Account created'
 *
 *       400:
 *         description: "Bad Request - check query parameters"
 *
 *       500:
 *         description: "Internal server error - sql"
 */

// router.get('/login/:username/:password', () => {})
// router.get('/delete/:id', () => {})
// router.get('/update/:id', () => {})

router.get('/all', getAllUsersHandler)
/**
 * @swagger
 *
 * /api/reading/user/all:
 *   get:
 *     description: Get all users
 *     tags:
 *       - Reading APP [DEV]
 *     responses:
 *       200:
 *         description: A list of users
 */

router.get('/create-table', createTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/create-table:
 *   get:
 *     description: Create a user table when required
 *     tags:
 *       - Reading APP [DEV]
 *     responses:
 *       200:
 *         description: user table created
 */

router.get('/delete-table', deleteTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/delete-table:
 *   get:
 *     description: Delete user table when required
 *     tags:
 *       - Reading APP [DEV]
 *     responses:
 *       200:
 *         description: user table deleted
 */

export default router
