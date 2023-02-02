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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *
 *       400:
 *         description: "Bad Request - check query parameters"
 *       500:
 *         description: "Internal server error - sql"
 */

export default router
