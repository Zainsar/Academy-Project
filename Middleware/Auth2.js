const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()


const verifytoken = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token is not valid!'
                });
            }
            req.admin = admin;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'You are not authenticated'
        });
    }
};

module.exports = verifytoken