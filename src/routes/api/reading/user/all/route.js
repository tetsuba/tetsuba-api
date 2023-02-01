import express from 'express'
import getAllUsersHandler from './handler.js'

const router = express.Router()

router.get('/all', getAllUsersHandler)
/**
 * @swagger
 *
 * /api/reading/user/all:
 *   get:
 *     summary: Get all users.
 *     description: This route is used for development and should be removed when not required any more.
 *     tags:
 *       - Reading APP
 *     responses:
 *       200:
 *         summary: A list of users
 *         description: A list of users
 *       500:
 *         description: Sqlite error is triggered when a table does not exist.
 */

export default router
