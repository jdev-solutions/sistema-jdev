module.exports = (sequelize, DataType)=> {
    const Compra = sequelize.define('Compra', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataType.INTEGER
        },
        data_compra: {
            type: DataType.DATE
        },
        produtosId_compra: {
            type: DataType.INTEGER,
            references: {
              model: "produtos",
              key: "id",
            },
            field: "produtosId_compra"
        },
        userId_compra: {
            type: DataType.INTEGER,
            references: {
              model: "users",
              key: "id",
            },
            field: "userId_compra"
        }
    },{
        sequelize,
        timestamps: false,
        modelName: 'Compra',
        tableName: 'compras'
    })

    // Compra.sync({force: true});

    return Compra
}

