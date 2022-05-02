const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require("body-parser");
const path = require('path');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

//connexion à Mongo
mongoose.connect('mongodb+srv://valentine_mace:MONGOproject2022@project6.llep7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//pour problème CORS
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());
app.use(express.json());

//pour multer
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;