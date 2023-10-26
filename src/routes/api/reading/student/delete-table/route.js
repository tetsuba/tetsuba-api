import express from 'express'
import deleteTableHandler from './handler.js'
const router = express.Router()

//
router.delete('/delete-table', deleteTableHandler)
/**
 * @swagger
 *
 * /api/reading/student/delete-table:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a student table
 *     description: The main use for deleting a student table is testing the api.
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
 *                   example: 'Student table deleted'
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
