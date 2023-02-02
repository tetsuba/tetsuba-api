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
 *                 title:
 *                   type: string
 *                 story:
 *                   type: string
 *                 difficulty:
 *                   type: string
 *             example:
 *               title: "The Title"
 *               story: "Once upon a time"
 *               difficulty: "easy"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *         description: "Internal server error - sql"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export default router
