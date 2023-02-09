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
 *     description: Get all books with the same userId
 *     tags:
 *       - reading / book
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: A user's id to track which book they registered
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/book'
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
