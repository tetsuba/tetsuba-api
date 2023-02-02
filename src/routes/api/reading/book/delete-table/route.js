import express from 'express'
import deleteTableHandler from './handler.js'
const router = express.Router()

//
router.delete('/delete-table', deleteTableHandler)
/**
 * @swagger
 *
 * /api/reading/book/delete-table:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book table
 *     description: The main use for deleting a book table is testing the api.
 *     tags:
 *       - reading / book
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
 *                   example: 'Book table deleted'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Not authorized'
 *       500:
 *         description: Internal Server Error
 */
export default router
