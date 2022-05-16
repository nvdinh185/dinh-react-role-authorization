const jwt = require('jsonwebtoken');
const { secret } = require('../config.json');

module.exports = authorize;

function authorize(roles = []) {
    if (typeof roles === 'number') {
        roles = [roles];
    }

    return [
        (req, res, next) => {
            const token = req.headers['authorization'].slice(7);
            jwt.verify(token, secret,
                (err, decoded) => {
                    if (err) {
                        // console.log('Lỗi xác thực:', err.message);
                        return res.status(401).json({ message: err.message });
                    } else {
                        req.user = decoded;
                        if (roles.length && !roles.includes(req.user.role)) {
                            return res.status(401).json({ message: 'Unauthorized' });
                        }
                        next();
                    };
                });
        }
    ];
}