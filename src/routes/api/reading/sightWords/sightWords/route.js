import express from 'express'
import getSightWordsHandler from './handler.js'

const router = express.Router()

router.get('', getSightWordsHandler)

/**
 * @swagger
 *
 * /api/reading/sightWords:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary:
 *     description: Get all books with the same userId
 *     tags:
 *       - reading / sightWords
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
 *               type: object
 *               properties:
 *                   sightWordsFromBooks:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/word'
 *                   sightWordsNotInBooks:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/word'
 *                   sightWordsReadInBooks:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/word'
 *                   sightWordsReadWrong:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/word'
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
