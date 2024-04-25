const jwt = require('jsonwebtoken');

const generateTokenUser = (User) => {
    const payload = {
        User_id: User.User_id,
        User_email: User.User_email,
        User_username: User.User_username,
        roll: 2
    };
    const secretKey = process.env.JWT_SECRET3;
    const options = {
        expiresIn: '10h'
    };
    return jwt.sign(payload, secretKey, options);
};

module.exports = generateTokenUser