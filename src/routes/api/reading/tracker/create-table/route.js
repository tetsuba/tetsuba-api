import express from 'express'
import createTrackerTableHandler from './handler.js'
const router = express.Router()

router.post('/create-table', createTrackerTableHandler)
/**
 * @swagger
 *
 * /api/reading/tracker/create-table:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a tracker table.
 *     description: The main use for creating a tracker table is testing the api.
 *     tags:
 *       - reading / tracker
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
 *                   example: 'Tracker table created'
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
