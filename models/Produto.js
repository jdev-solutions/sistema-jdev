module.exports = (sequelize, DataType)=> {
    const Produto = sequelize.define('Produto', {
        // id: {
        //     type: DataType.INTERGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
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

    return Produto
}

