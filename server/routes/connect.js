const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connexion réussie à la base de données MongoDB');
    })
    .catch(error => {
      console.error('Erreur de connexion à la base de données :', error);
    });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
};

module.exports = connectDB;
