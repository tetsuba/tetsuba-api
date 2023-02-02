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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 22
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
 *                   example: Book deleted
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
 *         description: Internal server error
 */

export default router
