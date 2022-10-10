const Sequelize = require('sequelize');
const config = require('../config/database');
const { Produto } = require('../models');
const Op = Sequelize.Op 

const produtosController = {
    // index: async (req, res)=> {
    //     const connection = new Sequelize(config);
    //     let nomeUsuario = "Henrique" // EXEMPLO PARA SAIR NO TERMINAL
    //     const result = await connection.query('SELECT * FROM users WHERE users.name + :nomeUsuario', 
    //     {
    //         replacements: {
    //             nomeUsuario
    //         },
    //         type: Sequelize.QueryTypes.SELECT
    //     })

    //     console.log(result);
    // }
    index2: async (req, res)=> {
        let produtos = await Produto.findAll();
        return res.render('produtos', { produtos })
    },
    create2: (req, res)=> {
        return res.render('cadastroProdutos')
    },
    store2: async (req, res)=> {
        const { name, valor } = req.body;

        const resultado = await Produto.create({
            name,
            valor
        });

        console.log(resultado);

        return res.redirect('/produtos')
    },
    findById2: async (req, res)=> {
        let {id} = req.params;

        let produto = await Produto.findOne({
            where: {
                id:id // busca o usuario do ID que for digitado na rota EX.: http://localhost:3000/users/2 no terminal vem os dados do usuario de id 2 - Leonardo
            }
        })
        
        return res.render('dadosProduto', { produto })
    },
    search2: async (req, res)=> {
        let {key} = req.query

        let produtos = await Produto.findAll({
            where: {
                name: {
                    [Op.like]: `%${key}%`
                }
            }
            // order:  [
                // ['coluna que queremos ordenar', 'DESC- descrecente']
            // ]
        })

        return res.render('produtos', { produtos })
    }
}

module.exports = produtosController;