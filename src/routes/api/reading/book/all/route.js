import express from 'express'
import getAllBooksHandler from './handler.js'

const router = express.Router()

router.get('/all', getAllBooksHandler)
/**
 * @swagger
 *
 * /api/reading/book/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all books.
 *     description: This route is used for development and should be removed when not required any more.
 *     tags:
 *       - reading / book
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
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
