const express = require('express');

/* IMPORTA O MODEL DE CATEGORIA */
const modelCategoria = require('../model/modelCategoria');

/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE INSERÇÃO DE CATEGORIA */
router.post('/inserirCategoria', (req, res) => {
    const { nome_categoria } = req.body;

    modelCategoria.create({ nome_categoria })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                mensageStatus: 'CATEGORIA INSERIDA COM SUCESSO'
            });
        })
        .catch((error) => {
            console.error('Erro ao inserir categoria:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO INSERIR A CATEGORIA',
                errorObject: error
            });
        });
});

/* ROTA DE LISTAGEM GERAL DE CATEGORIAS */
router.get('/listagemCategorias', (req, res) => {
    modelCategoria.findAll()
        .then((response) => {
            return res.status(200).json({
                errorStatus: false,
                mensageStatus: 'CATEGORIAS LISTADAS COM SUCESSO',
                data: response
            });
        })
        .catch((error) => {
            console.error('Erro ao listar categorias:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO LISTAR AS CATEGORIAS',
                errorObject: error
            });
        });
});

/* ROTA DE LISTAGEM DE CATEGORIA POR CÓDIGO */
router.get('/listagemCategoria/:cod_categoria', (req, res) => {
    const { cod_categoria } = req.params;

    modelCategoria.findByPk(cod_categoria)
        .then((response) => {
            if (response) {
                return res.status(200).json({
                    errorStatus: false,
                    mensageStatus: 'CATEGORIA RECUPERADA COM SUCESSO',
                    data: response
                });
            } else {
                return res.status(404).json({
                    errorStatus: true,
                    mensageStatus: 'CATEGORIA NÃO ENCONTRADA'
                });
            }
        })
        .catch((error) => {
            console.error('Erro ao recuperar categoria:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO RECUPERAR A CATEGORIA',
                errorObject: error
            });
        });
});

/* ROTA DE EXCLUSÃO DE CATEGORIA */
router.delete('/excluirCategoria/:cod_categoria', (req, res) => {
    const { cod_categoria } = req.params;

    modelCategoria.destroy({ where: { cod_categoria } })
        .then((rowsDeleted) => {
            if (rowsDeleted > 0) {
                return res.status(200).json({
                    errorStatus: false,
                    mensageStatus: 'CATEGORIA EXCLUÍDA COM SUCESSO'
                });
            } else {
                return res.status(404).json({
                    errorStatus: true,
                    mensageStatus: 'CATEGORIA NÃO ENCONTRADA'
                });
            }
        })
        .catch((error) => {
            console.error('Erro ao excluir categoria:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO EXCLUIR A CATEGORIA',
                errorObject: error
            });
        });
});

/* ROTA DE ALTERAÇÃO DE CATEGORIA */
router.put('/alterarCategoria', (req, res) => {
    const { cod_categoria, nome_categoria } = req.body;

    modelCategoria.update(
        { nome_categoria },
        { where: { cod_categoria } }
    )
        .then((rowsUpdated) => {
            if (rowsUpdated[0] > 0) {
                return res.status(200).json({
                    errorStatus: false,
                    mensageStatus: 'CATEGORIA ALTERADA COM SUCESSO'
                });
            } else {
                return res.status(404).json({
                    errorStatus: true,
                    mensageStatus: 'CATEGORIA NÃO ENCONTRADA'
                });
            }
        })
        .catch((error) => {
            console.error('Erro ao alterar categoria:', error);
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO ALTERAR A CATEGORIA',
                errorObject: error
            });
        });
});

module.exports = router;
