const Sequelize = require("sequelize")
const { STRING } = require("sequelize")
const conn = new Sequelize("postgres://localhost/friadsDB", { logging: false })

const Users = conn.define("users", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		//[PK] unique?
	},
	value: {
		type: Sequelize.SMALLINT,
		//[PK] default value?
	},
})

const createUser = async () => {
	await conn.sync({ force: true })
	//[PK] -- why save "name" and "value" if you don't use them? (I know prof keeps doing this so you're probably just copying, but he shouldn't do it either!)
	const [name, value] = await Promise.all([
		Users.create({ name: "toni", value: 5 }),
		Users.create({ name: "franc", value: 5 }),
	])
}
module.exports = {
	createUser,
	Users,
}
