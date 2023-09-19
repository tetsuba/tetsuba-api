import express from 'express'
import updateStudentHandler from './handler.js'
const router = express.Router()

router.patch('/update', updateStudentHandler)
/**
 * @swagger
 *
 * /api/reading/student/update:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a student's data
 *     description: Update a student's data
 *     tags:
 *       - reading / student
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentId:
 *                   type: integer
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 dob:
 *                   type: string
 *             example:
 *               studentId: 2
 *               firstname: "ted"
 *               lastname: "bob"
 *               dob: "12/12/12"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/student'
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
