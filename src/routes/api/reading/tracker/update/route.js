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
 *     summary: Edit a book
 *     description: Edit a book and update the database
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
 *                 data:
 *                   type: string
 *             example:
 *               userId: 2
 *               data: "[{libId:'001', bookId: 1, history: [{date: '12/12/12', words: []}]}]"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/book'
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
