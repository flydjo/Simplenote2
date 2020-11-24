const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notesRoute = require('./routes/notes');
const cors = require('cors');
const userRoute = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://jordiland:Novembre2@cluster0.uhjvw.mongodb.net/simplenote?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée :', err));

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/', notesRoute);
app.use('/auth', userRoute); // Mon nouveau fichier de route pour user

module.exports = app;