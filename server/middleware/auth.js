const jwt = require('jsonwebtoken')

// Middleware to authenticate JWT toknes
// Verifies if user is authenticated before accessing protected routes
const authenticateToken = (req, res, next) => {\

    // 1. Get authorization header
    const authHeader = req.headers['authorization']

    // 2. Extract token from header ( Bearer TOKEN )
    const token = authHeader && authHeader.split(' ')[1]
    
    // 3. Deny access if there's no token
    if ( !token ) {
        return res.status(401).json({
            error: 'Access token required', 
            message: 'Enter a valid acces token'
        })
    }

    // 4. Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if ( err ) {
            // Invalid or expired token
            return res.status(403).json({
                error: 'Invalid or expired token',
                message: 'Token is invalid or expired'
            })
        }
    })

    // 5. Valid token - add user data to request
    req.user = user

    // 6. Continue to the next middleware or route
    next()

    
}