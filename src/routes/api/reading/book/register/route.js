import express from 'express'
import registerBookHandler from './handler.js'
const router = express.Router()

router.post('/register', registerBookHandler)
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
 *                 title:
 *                   type: string
 *                 story:
 *                   type: string
 *             example:
 *               userId: 2
 *               title: "The Title"
 *               story: "Once upon a time"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/collection'
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
