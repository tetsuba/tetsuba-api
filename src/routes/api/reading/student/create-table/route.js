import express from 'express'
import createStudentTableHandler from './handler.js'
const router = express.Router()

router.post('/create-table', createStudentTableHandler)
/**
 * @swagger
 *
 * /api/reading/student/create-table:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a book table.
 *     description: The main use for creating a student table is testing the api.
 *     tags:
 *       - reading / student
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
 *                   example: 'Student table created'
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
