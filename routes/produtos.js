const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// listar produtos
router.get('/', produtosController.index2);
router.get('/verProduto/:id', produtosController.findById2);
router.get('/search2', produtosController.search2);
router.get('/cadastroProduto', produtosController.create2);
router.post('/cadastroProduto', produtosController.store2);

module.exports = router;