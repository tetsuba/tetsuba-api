import express from 'express'
import registerNewUserHandler from './handler.js'
const router = express.Router()

router.post('/register', registerNewUserHandler)
/**
 * @swagger
 *
 * /api/reading/user/register:
 *   post:
 *     description: Register a new user
 *     tags:
 *       - reading / user
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: user's first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: user's last name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: user's email address
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: user's chosen password
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Account created'
 *
 *       400:
 *         description: "Bad Request - check query parameters"
 *
 *       500:
 *         description: "Internal server error - sql"
 */

export default router
