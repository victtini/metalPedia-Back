// database.js
const Sequelize = require('sequelize');

/***** CRIA A CONEXÃO COMO BANCO DE DADOS *****/
const connection = new Sequelize(
    'metalPedia',  // nome do banco de dados
    'root',        // usuário do banco de dados
    'boy10boy',    // senha
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;
