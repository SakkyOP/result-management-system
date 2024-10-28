const jwt = require("jsonwebtoken")

const TOKEN_EXPIRY = "1h"

function generateAdminJWT(user) {
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return token;
}

const jwtService = {
    generateAdminJWT,
}

module.exports = jwtService;