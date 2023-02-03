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
 *       - reading / user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
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
