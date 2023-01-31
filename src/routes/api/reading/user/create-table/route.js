import express from 'express'
import createTableHandler from './handler.js'
const router = express.Router()

router.put('/create-table', createTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/create-table:
 *  put:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a user table.
 *     description: The main use for creating a user table is testing the api. A put request will always produce the same result
 *     tags:
 *       - Reading APP
 *     responses:
 *       200:
 *         description: user table created
 */

export default router
