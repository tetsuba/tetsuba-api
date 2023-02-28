import express from 'express'
import addTrackerHandler from './handler.js'
const router = express.Router()

router.post('/add', addTrackerHandler)
/**
 * @swagger
 *
 * /api/reading/book/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new book
 *     description: Register a new book
 *     tags:
 *       - reading / book
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *             example:
 *               userId: 2
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/book'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badrequest'
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
