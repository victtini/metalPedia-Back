const Sequelize = require('sequelize');
const connection = require('../database/database');
const modelCategoria = require('./modelCategoria');

const modelMusica = connection.define('tblMusica', {
    cod_musica: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo_musica: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    nome_banda: { // Novo campo para o nome da banda ou cantor
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ano_lancamento: { // Modificado para DATE para registrar o ano de lançamento completo
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cod_categoria: {
        type: Sequelize.INTEGER,
        references: {
            model: modelCategoria,
            key: 'cod_categoria'
        }
    }
});

// modelMusica.sync({ alter: true }); // Atualiza a tabela para refletir as alterações

module.exports = modelMusica;
