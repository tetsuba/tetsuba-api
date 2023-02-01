import express from 'express'
import deleteTableHandler from './handler.js'
const router = express.Router()

//
router.put('/delete-table', deleteTableHandler)
/**
 * @swagger
 *
 * /api/reading/book/delete-table:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book table
 *     description: The main use for deleting a book table is testing the api. A put request will always produce the same result.
 *     tags:
 *       - Reading APP
 *     responses:
 *       200:
 *         description: book table deleted
 */
export default router
