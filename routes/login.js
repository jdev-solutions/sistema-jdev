const express = require('express');
const userController = require('../controllers/userController'); // Importa o controller de login
const router = express.Router();

router.post('/', userController.login);

module.exports = router;