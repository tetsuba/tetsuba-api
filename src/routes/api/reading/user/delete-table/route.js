import express from 'express'
import deleteTableHandler from './handler.js'
const router = express.Router()

router.get('/delete-table', deleteTableHandler)
/**
 * @swagger
 *
 * /api/reading/user/delete-table:
 *   get:
 *     description: Delete user table when required
 *     tags:
 *       - Reading APP [DEV]
 *     responses:
 *       200:
 *         description: user table deleted
 */
export default router
