import express from 'express'
import getBookHandler from './handler.js'

const router = express.Router()

router.get('', getBookHandler)

/**
 * @swagger
 *
 * /api/reading/student:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary:
 *     description: Get students
 *     tags:
 *       - reading / student
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Get students by userId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/student'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/unauthorized'
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/internalserver'
 */
export default router
