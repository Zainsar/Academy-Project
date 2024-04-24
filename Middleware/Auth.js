const jwt = require('jsonwebtoken');

const generateToken = (admin) => {
    const payload = {
        admin_id: admin.admin_id,
        admin_email: admin.admin_email,
        admin_username: admin.admin_username,
        roll: 0
    };
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, secretKey, options);
};

module.exports = generateToken