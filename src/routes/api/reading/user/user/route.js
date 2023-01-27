import express from 'express'
import getUsersHandler from './handler.js'

const router = express.Router()

router.get('', getUsersHandler)
/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # optional, for documentation purposes only
 *
 * security:
 *   - bearerAuth: []
 *
 * /api/reading/user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     description: Get user information
 *     tags:
 *       - Reading APP
 *     responses:
 *       200:
 *         description: User Details
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   id:
 *                     type: number
 *       401:
 *        description: Not Authorized
 *        content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */

export default router
