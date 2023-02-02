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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *             example:
 *               userId: 22
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: This is a title
 *                   story:
 *                     type: string
 *                     example: This is a story a very long story.
 *                   difficulty:
 *                     type: string
 *                     example: easy
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
