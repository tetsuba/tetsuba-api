import jwt from 'jsonwebtoken'

/* istanbul ignore next */
function getSecret() {
    return process.env.NODE_ENV ? 'jestTest' : process.env.JWT_SECRET
}

export function createJWT(payload) {
    return jwt.sign(payload, getSecret(), { expiresIn: '1h' })
}

function getBearerToken({ authorization }) {
    return authorization ? authorization.split(' ')[1] : ''
}

function unProtectedRoute(url) {
    const list = [
        'api-docs',
        'reading/user/all',
        'reading/user/register',
        'reading/user/login'
    ]
    return list.some((route) => url.includes(route))
}

export function protectRoutes(req, res, next) {
    // console.log('[PROTECTED ROUTES]: ', unProtectedRoute(req.url), req.url)
    if (unProtectedRoute(req.url)) return next()
    const token = getBearerToken(req.headers)

    // console.log('[TOKEN]', jwt.sign({id: 0, email: 'test@test.com'}, 'jestTest'))

    if (token) {
        try {
            const user = jwt.verify(token, getSecret())
            // console.log('[user]', user)
            res.user = user
            next()
        } catch (e) {
            const expired = e.message === 'jwt expired'
            // console.log(e.message, expired)
            res.status(401).json({ message: 'Not authorized', expired })
        }
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
}
