const Sequelize = require('sequelize');
const config = require('../config/database');

const produtosController = {
    index: async (req, res)=> {
        return res.render('index')
    }
}

module.exports = produtosController;