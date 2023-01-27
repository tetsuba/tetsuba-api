import jwt from 'jsonwebtoken'
/* istanbul ignore next */
const secret = process.env.NODE_ENV ? 'jestTest' : process.env.JWT_SECRET

export function createJWT(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' })
}

function getBearerToken({ authorization }) {
    return authorization ? authorization.split(' ')[1] : ''
}

function unProtectedRoute(url) {
    const list = [
        'api-docs',
        'reading/user/all',
        'reading/user/register',
        'reading/user/login',
        'reading/user/create-table',
        'reading/user/delete-table'
    ]
    return list.some((route) => url.includes(route))
}

export function protectRoutes(req, res, next) {
    // console.log('[PROTECTED ROUTES]: ', unProtectedRoute(req.url), req.url)
    if (unProtectedRoute(req.url)) return next()
    const token = getBearerToken(req.headers)

    // console.log('[TOKEN]', jwt.sign({id: 0, eml: 'test@test.com'}, secret))

    if (token) {
        try {
            const user = jwt.verify(token, secret)
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
