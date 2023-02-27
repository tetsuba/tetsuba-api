import express from 'express'
import updateBookHandler from './handler.js'
const router = express.Router()

router.patch('/update', updateBookHandler)
/**
 * @swagger
 *
 * /api/reading/book/update:
 *   patch:
 *     deprecated: true
 *     security:
 *       - bearerAuth: []
 *     summary: Update a book's history
 *     description: Update a book's history
 *     tags:
 *       - reading / book
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 story:
 *                   type: string
 *             example:
 *               id: 2
 *               title: "The Title"
 *               story: "Once upon a time"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/book'
 *
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
