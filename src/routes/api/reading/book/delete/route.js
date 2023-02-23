import express from 'express'
import deleteBookHandler from './handler.js'

const router = express.Router()

router.delete('/delete', deleteBookHandler)
/**
 * @swagger
 *
 * /api/reading/book/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book
 *     description: Delete a book with a specified id
 *     tags:
 *       - reading / book
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         description: Delete a book from the database
 *     responses:
 *       200:
 *         description: OK - Return an updated list of books
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
