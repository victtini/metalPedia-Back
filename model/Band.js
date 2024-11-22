// Band.js
const Sequelize = require('sequelize');
const connection = require('../database/database');  // Importa a conexão correta

const Band = connection.define('tbl_banda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeDaBanda: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

// Sincroniza o modelo Banda
// Band.sync({ alter: true })  // Evita recriar a tabela, faz apenas alterações necessárias
//     .then(() => {
//         console.log('Tabela Band sincronizada com sucesso!');
//     })
//     .catch((error) => {
//         console.error('Erro ao sincronizar tabela Band:', error);
//     });
    

module.exports = Band;
