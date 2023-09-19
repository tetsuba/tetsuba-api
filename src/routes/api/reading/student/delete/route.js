import express from 'express'
import deleteBookHandler from './handler.js'

const router = express.Router()

router.delete('/delete', deleteBookHandler)
/**
 * @swagger
 *
 * /api/reading/student/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a student
 *     description: Delete a student with a specified id
 *     tags:
 *       - reading / student
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         description: Delete a student from the database
 *     responses:
 *       200:
 *         description: OK - Return an updated list of students
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/student'
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
