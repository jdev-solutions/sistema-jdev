const Sequelize = require('sequelize');
const config = require('../config/database');
const { Compra } = require('../models');
const Op = Sequelize.Op 

const comprasController = {
    index3: async (req, res)=> {
        let compras = await Compra.findAll();
        return res.render('compras', { compras })
    },
    findById3: async (req, res)=> {
        let {id} = req.params;

        let compra = await Compra.findOne({
            where: {
                id:id // busca o usuario do ID que for digitado na rota EX.: http://localhost:3000/users/2 no terminal vem os dados do usuario de id 2 - Leonardo
            }
        })
        
        return res.render('dadosCompra', { compra })
    },
    search3: async (req, res)=> {
        let {key} = req.query

        let compras = await Compra.findAll({
            where: {
                id: {
                    [Op.like]: `%${key}%`
                }
            }
            // order:  [
                // ['coluna que queremos ordenar', 'DESC- descrecente']
            // ]
        })

        return res.render('compras', { compras })
    }
}

module.exports = comprasController;