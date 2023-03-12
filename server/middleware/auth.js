const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.body.cookie
    try {

        const user = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        req.user = user

        next();
    } catch (error) {
        res.status(401).json({ error });
        return res.redirect("/");
    }
};


