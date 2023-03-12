
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


const userState = {
    userName: req.body.email,
    isAdmin: req.body.email == 'root' ? true : false
}

exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401)
                            .json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = jwt.sign(userState, process.env.RANDOM_TOKEN_SECRET, { expiresIn: "1h" });

                    res.send({ 'token': token })




                }).catch(error => res.status(501).json({ message: error }));


        }).catch(error => res.status(500).json({ message: error }));


};


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)

        .then(hash => {
            const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))


                .catch(error => res.status(400).json({ message: error }));
        })
        .catch(error => res.status(500).json({ message: error }));
};