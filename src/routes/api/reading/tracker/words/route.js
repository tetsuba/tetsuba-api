import express from 'express'
import getWordsFromTrackerHandler from './handler.js'

const router = express.Router()

router.get('/words', getWordsFromTrackerHandler)

/**
 * @swagger
 *
 * /api/reading/tracker/words:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary:
 *     description: Get a list of words displaying the frequency read incorrectly
 *     tags:
 *       - reading / tracker
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: A user's id to find tracking data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/word'
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
