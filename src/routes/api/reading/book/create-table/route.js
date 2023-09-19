import express from 'express'
import createBookTableHandler from './handler.js'
const router = express.Router()

router.post('/create-table', createBookTableHandler)
/**
 * @swagger
 *
 * /api/reading/book/create-table:
 *  post:
 *     deprecated: true
 *     security:
 *       - bearerAuth: []
 *     summary: Create a book table.
 *     description: The main use for creating a book table is testing the api.
 *     tags:
 *       - reading / book
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Book table created'
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
