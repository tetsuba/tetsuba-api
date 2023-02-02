import express from 'express'
import createUserTableHandler from './handler.js'
const router = express.Router()

router.post('/create-table', createUserTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/create-table:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a user table.
 *     description: The main use for creating a user table is testing the api.
 *     tags:
 *       - reading / user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User table created'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Not authorized'
 *       500:
 *         description: Internal Server Error
 */

export default router
