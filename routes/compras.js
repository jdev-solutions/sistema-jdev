const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

// listar produtos
router.get('/', comprasController.index3);
router.get('/verCompra/:id', comprasController.findById3);
router.get('/search3', comprasController.search3);

module.exports = router;