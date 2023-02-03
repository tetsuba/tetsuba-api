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
 *       - reading / user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/internalserver'
 */

export default router
