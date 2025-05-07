// Charge les variables d'environnement depuis le secret file Render
require('dotenv').config({ path: '/etc/secrets/.env' });

const { Sequelize } = require('sequelize');

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

// Construction de l'URL de connexion
const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Initialisation de Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Authentication et synchronisation
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base réussie.');
    return sequelize.sync();
  })
  .then(() => console.log('Base synchronisée.'))
  .catch(err => console.error('Erreur base de données :', err));

module.exports = sequelize;
