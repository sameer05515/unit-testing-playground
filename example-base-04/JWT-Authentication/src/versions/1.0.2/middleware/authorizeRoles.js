// Middleware to check if the user has the required role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                messages: ['Forbidden: Insufficient role'],
                data: null,
                statusCode: 403,
                timeStamp: new Date().toISOString(),
            });
        }
        next();
    };
};

module.exports = authorizeRoles;
