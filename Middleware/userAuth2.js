const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()

const verifytoken3 = (req, res, next) => {
    console.log(req.headers.authorization)
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET3, (err, User) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token is not valid!'
                });
            }
            req.User = User;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'You are not authenticated'
        });
    }
};

module.exports = verifytoken3