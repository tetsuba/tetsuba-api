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
    const protectedRoute = url.startsWith('/api/reading/')
    /* istanbul ignore next */
    if (protectedRoute) {
        const list = ['reading/user/register', 'reading/user/login']
        return list.some((route) => url.includes(route))
    }
    /* istanbul ignore next */
    return true
}

export function protectRoutes(req, res, next) {
    // console.log('unProtectedRoute', unProtectedRoute(req.url), req.url)
    if (unProtectedRoute(req.url)) return next()
    const token = getBearerToken(req.headers)

    // console.log('[TOKEN]', jwt.sign({id: 1, email: 'test@test.com'}, process.env.JWT_SECRET))
    // console.log(token)

    if (token) {
        try {
            const user = jwt.verify(token, getSecret())
            // console.log('[user]', user)
            res.user = user
            next()
        } catch (e) {
            const expired = e.message === 'jwt expired'
            // console.log(e.message, expired)
            next({ status: 401, stack: { expired } })
        }
    } else {
        next({ status: 401, stack: '' })
    }
}
