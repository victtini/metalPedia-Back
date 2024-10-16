// models/Musica.js
const Sequelize = require('sequelize');
const connection = require('../database/database');
const modelCategoria = require('./modelCategoria'); // Importar o modelo de Categoria para a relação

/*
PARAMETROS DO MÉTODO DEFINE
1 - NOME DA TABELA - STRING
2 - OBJETO JSON: 
    NOME DO CAMPO DA TABELA
    TIPO DE DADO DO CAMPO DA TABELA
    REGRAS DO CAMPO DA TABELA (NULL, NOT NULL, DEFAULT...ETC)
*/

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
    ano_lancamento: {
        type: Sequelize.INTEGER,
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

// Sincronizar com o banco de dados
modelMusica.sync({ alter: true });

module.exports = modelMusica;
