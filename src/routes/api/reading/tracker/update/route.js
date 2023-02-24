import express from 'express'
import updateTrackerHandler from './handler.js'
const router = express.Router()

router.patch('/update', updateTrackerHandler)
/**
 * @swagger
 *
 * /api/reading/tracker/update:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update tracker data
 *     description: Update part of the tracker data
 *     tags:
 *       - reading / tracker
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 libId:
 *                   type: string
 *                 bookId:
 *                   type: integer
 *                 history:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/history'
 *             example:
 *               userId: 2
 *               libId: '001'
 *               bookId: 2
 *               history: "[{date: '12/12/12', words: ['there', 'then']}]"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/collection'
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
