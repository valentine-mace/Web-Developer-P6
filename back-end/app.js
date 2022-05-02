const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://valentine_mace:MONGOproject2022@project6.llep7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


//Pour gérer la requête POST venant de l'application front-end,
//on a besoin d'en extraire le corps JSON
app.use(express.json());



module.exports = app;