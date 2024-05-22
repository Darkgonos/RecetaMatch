const jwt = require('jsonwebtoken');
const User = require('./schemaUser');

let protectRoute = role => {
    return (req, res, next) => {
        let token = req.headers['authorization'];
        if (token) {
            token = token.substring(7);
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ ok: false, error: "Invalid token" });
                } else {
                    User.findOne({ username: decoded.login })
                        .then(user => {
                            if (user && (role === "" || user.role === "admin" || role === user.role)) {
                                req.user = user;
                                next();
                            } else {
                                res.status(401).json({ ok: false, error: "Unauthorized user" });
                            }
                        })
                        .catch(error => {
                            res.status(500).json({ ok: false, error: "Error finding user", details: error });
                        });
                }
            });
        } else {
            res.status(401).json({ ok: false, error: "Authorization token is missing" });
        }
    };
};

module.exports = protectRoute;
