import express from 'express'
import getTrackerHandler from './handler.js'

const router = express.Router()

router.get('', getTrackerHandler)

/**
 * @swagger
 *
 * /api/reading/tracker:
 *   get:
 *     deprecated: true
 *     security:
 *       - bearerAuth: []
 *     summary:
 *     description: Get tracking data on the readers progress
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
 *                 $ref: '#/components/schemas/tracker'
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
