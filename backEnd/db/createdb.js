const Sequelize = require('sequelize');
const { STRING } = require('sequelize');
const conn= new Sequelize('postgres://localhost/friadsDB',{logging: false})

const Users= conn.define( 'users', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.SMALLINT
    }
})
      
const createUser= async()=>{
    await conn.sync({force: true});
    const [name, value]= await Promise.all([
        Users.create({name:'toni', value: 5}),
        Users.create({name:'franc', value: 5})
    ])
};
module.exports={
    createUser,
    Users
}