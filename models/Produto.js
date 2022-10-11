module.exports = (sequelize, DataType)=> {
    const Produto = sequelize.define('Produto', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataType.INTEGER
        },
        name: {
            type: DataType.STRING
        },
        valor: {
            type: DataType.INTEGER
        }
    },{
        timestamps: false,
        tableName: 'produtos'
    })

    // Produto.sync({force: true});

    return Produto
}

