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
