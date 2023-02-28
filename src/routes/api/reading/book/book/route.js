import express from 'express'
import getBookHandler from './handler.js'

const router = express.Router()

router.get('', getBookHandler)

/**
 * @swagger
 *
 * /api/reading/book:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary:
 *     description: Get all books
 *     tags:
 *       - reading / book
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: userId to get tracker history and books registered
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/collection'
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
