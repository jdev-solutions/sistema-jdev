const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// listar produtos
router.get('/', indexController.index);

module.exports = router;