const express = require('express');

/* IMPORTA O MODEL DE BANDA */
const Band = require('../model/Band');

/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE INSERÇÃO DE BANDA */
router.post('/inserirBanda', async (req, res) => {
    const { nome_banda } = req.body;  // Garantir que nome_banda é recebido corretamente

    try {
        const newBand = await Band.create({ nomeDaBanda: nome_banda });
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'Banda inserida com sucesso!',
            data: newBand
        });
    } catch (error) {
        console.error('Erro ao inserir banda:', error);
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'Erro ao inserir banda',
            errorObject: error
        });
    }
});


/* ROTA DE LISTAGEM GERAL DE BANDAS */
router.get('/listagemBandas', (req, res) => {
    Band.findAll()
        .then(response => {
            return res.status(200).json({  // Status 200 para sucesso na listagem
                errorStatus: false,
                mensageStatus: 'Bandas listadas com sucesso',
                data: response
            });
        })
        .catch(error => {
            console.error('Erro ao listar bandas:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'Erro ao listar bandas',
                errorObject: error
            });
        });
});



/* ROTA DE LISTAGEM DE BANDA POR CÓDIGO */
router.get('/listagemBanda/:cod_banda', (req, res) => {

    let { cod_banda } = req.params; // Usar cod_banda ao invés de cod_livro

    Band.findByPk(cod_banda)
    .then((response) => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'BANDA RECUPERADA COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR A BANDA',
            errorObject: error
        });
    });
});

/* ROTA DE EXCLUSÃO DE BANDA */
router.delete('/excluirBanda/:cod_banda', (req, res) => {

    let { cod_banda } = req.params; // Usar cod_banda ao invés de cod_livro

    Band.destroy({ where: { cod_banda } })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'BANDA EXCLUÍDA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR A BANDA',
            errorObject: error
        });
    });
});

/* ROTA DE ALTERAÇÃO DE BANDA */
router.put('/alterarBanda', (req, res) => {

    let { cod_banda, nome_banda } = req.body; // Usar cod_banda e nome_banda

    Band.update({
        nomeDaBanda: nome_banda,  // Atualiza o nome da banda
    }, { where: { cod_banda } })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'BANDA ALTERADA COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR A BANDA',
            errorObject: error
        });
    });
});

module.exports = router;
