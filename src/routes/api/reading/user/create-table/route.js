import express from 'express'
import createTableHandler from './handler.js'
const router = express.Router()

router.get('/create-table', createTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/create-table:
 *   get:
 *     description: Create a user table
 *     tags:
 *       - Reading APP [DEV]
 *     responses:
 *       200:
 *         description: user table created
 */

export default router
