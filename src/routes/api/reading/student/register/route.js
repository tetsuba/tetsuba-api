import express from 'express'
import registerBookHandler from './handler.js'
const router = express.Router()

router.post('/register', registerBookHandler)
/**
 * @swagger
 *
 * /api/reading/student/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new student
 *     description: Register a new student
 *     tags:
 *       - reading / student
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 dob:
 *                   type: string
 *             example:
 *               userId: 2
 *               firstname: "Bob"
 *               lastname: "Smith"
 *               dob: "12/12/12"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/student'
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
