import express from 'express'
import loginUserHandler from './handler.js'
const router = express.Router()

router.post('/login', loginUserHandler)
/**
 * @swagger
 *
 * /api/reading/user/login:
 *   post:
 *     description: User logs in to be authenticated sending a username and password
 *     tags:
 *       - reading / user
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *             example:
 *               username: "test@test.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: A user is authenticated and receives a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/user'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/badrequest'
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/internalserver'
 */

export default router
