const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized Access Denied" })
    }

    try {
        const decodedToken = jwt.verify(authHeader, process.env.JWT_KEY)
        req.userId = decodedToken._id
        next()
    } catch (err) {
        res.status(401).json({ error: "Unauthorized Access Denied" })
    }
}