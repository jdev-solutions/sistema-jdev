const Sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../models/User');  // Certifique-se de importar o modelo User
const Produto = require('../models/Produto');  // Certifique-se de importar o modelo Produto

const indexController = {
    index: async (req, res) => {
      try {
        const userId = req.user?.id; // ✅ Usa o ID decodificado do token JWT
  
        if (!userId) {
          return res.redirect('/login'); // Redireciona se o token estiver ausente ou inválido
        }
  
        const user = await User.findOne({
          where: { id: userId },
          include: {
            model: Produto,
            attributes: ['name']
          }
        });
  
        if (!user) {
          return res.render('index', {
            userName: 'Usuário não encontrado',
            produtoName: 'Produto não encontrado'
          });
        }
  
        res.render('index', {
          userName: user.name,
          produtoName: user.Produto ? user.Produto.name : 'Produto não encontrado'
        });
  
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).send('Erro ao carregar dashboard');
      }
    }
  }  

module.exports = indexController;