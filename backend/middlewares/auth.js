const jwt = require("jsonwebtoken");

function adminAuth( req, res, next ) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET)
        .then(decoded=>{
            req.user = decoded;
            next();
        })
        .catch( error => {
            res.status(401).json({ error: 'Invalid or expired token' });
        });

}

const authMiddlewares = {
    adminAuth,
}

module.exports = authMiddlewares;