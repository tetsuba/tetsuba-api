import express from 'express'
import deleteTableHandler from './handler.js'
const router = express.Router()

//
router.put('/delete-table', deleteTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/delete-table:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user table
 *     description: The main use for deleting a user table is testing the api. A put request will always produce the same result.
 *     tags:
 *       - Reading APP
 *     responses:
 *       200:
 *         description: user table deleted
 */
export default router
