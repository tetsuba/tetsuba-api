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
 *               type: object
 *               properties:
 *                 readIncorrectly:
 *                   type: object
 *                   properties:
 *                     oneWeekAgo:
 *                       type: array
 *                       items:
 *                        $ref: '#/components/schemas/word'
 *                     oneMonthAgo:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/word'
 *                     history:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/word'
 *                 lastBookRead:
 *                   type: array
 *                   items:
 *                     properties:
 *                       bookId:
 *                         type: integer
 *                       libId:
 *                         type: string
 *                       date:
 *                         type: string
 *                       title:
 *                         type: string
 *                       words:
 *                         type: array
 *                         items:
 *                           type: string
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
