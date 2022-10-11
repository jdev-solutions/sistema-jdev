// const { Model } = require('sequelize');
// const Produto = require('./Produto');

module.exports = (sequelize, DataType)=> {
    const User = sequelize.define('User', {
        // id: {
        //     type: DataType.INTERGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataType.DATE,
            allowNull: false
        },
        age: {
            type: DataType.INTEGER,
            allowNull: false
        },
        phone: {
            type: DataType.STRING(20),
            allowNull: false
        },
        cpf: {
            type: DataType.STRING(20),
            allowNull: false
        },
        produtosId: {
            type: DataType.INTEGER,
            references: {
              model: "produtos",
              key: "id",
            },
            field: "produtosId"
          }
    },{
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'users'
    });

    // User.associate = (models)=> {
    //     User.belongsTo(models.Produto, {
    //         foreingKey: "produtosId",
    //         targetKey: "id",
    //         allowNull: false
    //     });
    // }

    User.associate = (models)=> {
        //associações vão aqui!
        User.belongsTo(models.Produto, {
          foreignKey: "produtosId",
          targetKey: "id"
        });
    }

    User.sync({force: true});
    return User
}

