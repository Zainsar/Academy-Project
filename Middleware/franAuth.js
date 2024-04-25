const jwt = require('jsonwebtoken');

const generateTokenFranchise = (Franchise) => {
    const payload = {
        fran_id: Franchise.fran_id,
        fran_email: Franchise.fran_email,
        fran_username: Franchise.fran_username,
        roll: 1
    };
    const secretKey = process.env.JWT_SECRET2;
    const options = {
        expiresIn: '10h'
    };
    return jwt.sign(payload, secretKey, options);
};

module.exports = generateTokenFranchise