// const models = require('../models');
const config = require('../config/database');
const { User } = require('../models');
// const { Produto } = require('../models');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op

const userController = {
    index: async (req, res)=> {
        let users = await User.findAll();
        return res.render('users', { users })
    },
    create: async (req, res)=> {
        // let produtos = await Produto.findAll();
        return res.render('cadastroUser')
        //, {produtos}
    },
    store: async (req, res)=> {
        const { name, email, birthdate, password, age, phone, cpf, produtosId } = req.body;

        const resultado = await User.create({
            name,
            email,
            birthdate,
            password: bcrypt.hashSync(password, 10),
            age, 
            phone,
            cpf,
            produtosId
        });

        if(produtosId == '1') {
            console.log("Cartão de Crédito");
        } else if(produtosId == '2') {
            console.log("Empréstimo Pessoal");
        } else if(produtosId == '3') {
            console.log("Conta Corrente");
        } else {
            console.log("Esse produto não existe");
        }

        console.log(resultado);

        return res.redirect('/users')
    },
    edit: async (req, res)=> {
        const {id} = req.params;

        const user = await User.findByPk(id);

        return res.render('editarUser', {user})
    },
    update: async (req, res)=> {
        const {id} = req.params;
        const { name, email, birthdate, password, age, phone, cpf, produtosId } = req.body;

        const resultado = await User.update({
            name,
            email,
            birthdate,
            password,
            age,
            phone,
            cpf,
            produtosId
        }, {
            where: {
                id:id
            }
        });

        console.log(resultado);

        return res.redirect('/users')
    },
    destroy: async (req, res)=> {
        const {id} = req.params

        const resultado = await User.destroy({
            where: {
                id:id
            }
        })

        console.log(resultado);

        res.redirect('/users')
    }, 
    findById: async (req, res)=> {
        let {id} = req.params;

        let user = await User.findOne({
            where: {
                id:id // busca o usuario do ID que for digitado na rota EX.: http://localhost:3000/users/2 no terminal vem os dados do usuario de id 2 - Leonardo
            }
        })
        
        return res.render('dadosUser', { user })
    },
    search: async (req, res)=> {
        let {key} = req.query

        let users = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${key}%`
                }
            }
            // order:  [
                // ['coluna que queremos ordenar', 'DESC- descrecente']
            // ]
        })

        return res.render('users', { users })
    },
    login: async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await User.findOne({ where: { email } });
    
            if (!user) {
                console.log('Usuário não encontrado');
                return res.render('login', { error: 'Usuário não encontrado.' });
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                console.log('Senha incorreta');
                return res.render('login', { error: 'Senha incorreta.' });
            }
    
            // 🔹 Geração do token incluindo name e produtosId
            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name, // ✅ Incluindo o nome
                    produtosId: user.produtosId // ✅ Incluindo produtosId
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
    
            console.log(`✅ Token gerado: ${token}`);
    
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 3600000,
                signed: true,
                domain: 'localhost',
                path: '/'
            });
    
            res.redirect('/users')

        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).render('login', { error: 'Erro interno no servidor.' });
        }
    }
    // agregadores: async (req, res)=> {
        // let total = await User.count()
        // res.send("O total de itens na tabela é: " + total)
    //    User.max('age').then(max => {
    //        res.send("O usuario mais velho tem " + max + " anos")
    //    })
    //},
    // bulkCreate: async (req, res)=> {
    //     const listaDeUsuarios = [
    //         {name: "Igor", email: "igor@email.com", birthdate: "09-11-1999", password: "009988", age: "21"},
    //         {name: "Gilberto", email: "gilberto@email.com", birthdate: "03-03-1998", password: "006622", age: "22"},
    //         {name: "Fernanda", email: "fernanda@email.com", birthdate: "06-04-1998", password: "221177", age: "22"},
    //         {name: "Isabella", email: "isabella@email.com", birthdate: "09-11-2002", password: "223300", age: "18"}
    //     ]

    //     const resultado = await User.bulkCreate(listaDeUsuarios);
    //     console.log(resultado);

    //     res.send("Criados")
    // }
}

module.exports = userController