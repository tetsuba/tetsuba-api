import express from 'express'
import getAllUsersHandler from './handler.js'

const router = express.Router()

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

export default router
