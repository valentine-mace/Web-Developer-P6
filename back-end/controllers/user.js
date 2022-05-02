const bcrypt = require('bcrypt');

const User = require('../models/user');

const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      console.log(email);
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//nous utilisons la fonction sign de jsonwebtoken pour encoder un nouveau token ;
//ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token) ;
//nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY
//pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production) ;
//nous définissons la durée de validité du token à 24 heures. 
//L'utilisateur devra donc se reconnecter au bout de 24 heures ;
//nous renvoyons le token au front-end avec notre réponse.

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};