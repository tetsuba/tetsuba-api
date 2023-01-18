import jwt from 'jsonwebtoken'

export function createJWT(payload) {
    const secret = process.env.NODE_ENV ? 'jestTest' : process.env.JWT_SECRET

    return jwt.sign(payload, secret, { expiresIn: '1h' })
}

function getBearerToken({ authorization }) {
    return authorization ? authorization.split(' ')[1] : ''
}

function unProtectedRoute(url) {
    console.log(url)
    const list = [
        '/api/reading/user/all',
        '/api/reading/user/register',
        '/api/reading/user/login',
        '/api/reading/user/creat-table',
        '/api/reading/user/delete-table'
    ]
    return list.some((route) => route === url || url.includes('api-docs'))
}

export function protectRoutes(req, res, next) {
    if (unProtectedRoute(req.url)) return next()

    const token = getBearerToken(req.headers)
    console.log(token)
    // console.log(createJWT())

    if (token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(user)
            res.user = user
            next()
        } catch (e) {
            console.log(e)
            res.status(401).json({ message: 'Not authorized' })
        }
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
}
