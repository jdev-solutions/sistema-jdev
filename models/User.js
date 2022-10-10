module.exports = (sequelize, DataType)=> {
    const User = sequelize.define('User', {
        // id: {
        //     type: DataType.INTERGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        name: {
            type: DataType.STRING
        },
        email: {
            type: DataType.STRING
        },
        password: {
            type: DataType.STRING
        },
        birthdate: {
            type: DataType.DATE
        },
        age: {
            type: DataType.NUMBER
        },
        phone: {
            type: DataType.NUMBER
        },
        cpf: {
            type: DataType.NUMBER
        },
    },{
        timestamps: false,
        tableName: 'users'
    })

    return User
}

