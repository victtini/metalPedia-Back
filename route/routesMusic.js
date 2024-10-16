const express = require('express');

/* IMPORTA O MODEL DE MÚSICA */
const Music = require('../model/music');

/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE INSERÇÃO DE MÚSICA */
router.post('/inserirMusica', async (req, res) => {
    const { titulo_musica, ano_lancamento, url, cod_categoria } = req.body;  // Recebendo dados da música

    try {
        const newMusic = await Music.create({ 
            titulo_musica, 
            ano_lancamento, 
            url, 
            cod_categoria 
        });
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'Música inserida com sucesso!',
            data: newMusic
        });
    } catch (error) {
        console.error('Erro ao inserir música:', error);
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'Erro ao inserir música',
            errorObject: error
        });
    }
});

/* ROTA DE LISTAGEM GERAL DE MÚSICAS */
router.get('/listagemMusicas', (req, res) => {
    Music.findAll()
        .then(response => {
            return res.status(200).json({
                errorStatus: false,
                mensageStatus: 'Músicas listadas com sucesso',
                data: response
            });
        })
        .catch(error => {
            console.error('Erro ao listar músicas:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'Erro ao listar músicas',
                errorObject: error
            });
        });
});

/* ROTA DE LISTAGEM DE MÚSICA POR CÓDIGO */
router.get('/listagemMusica/:cod_musica', (req, res) => {
    let { cod_musica } = req.params;

    Music.findByPk(cod_musica)
    .then((response) => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'MÚSICA RECUPERADA COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR A MÚSICA',
            errorObject: error
        });
    });
});

/* ROTA DE EXCLUSÃO DE MÚSICA */
router.delete('/excluirMusica/:cod_musica', (req, res) => {
    let { cod_musica } = req.params;

    Music.destroy({ where: { cod_musica } })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'MÚSICA EXCLUÍDA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR A MÚSICA',
            errorObject: error
        });
    });
});

/* ROTA DE ALTERAÇÃO DE MÚSICA */
router.put('/alterarMusica', (req, res) => {
    let { cod_musica, titulo_musica, ano_lancamento, url, cod_categoria } = req.body;

    Music.update({
        titulo_musica, 
        ano_lancamento, 
        url, 
        cod_categoria
    }, { where: { cod_musica } })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'MÚSICA ALTERADA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR A MÚSICA',
            errorObject: error
        });
    });
});

module.exports = router;
