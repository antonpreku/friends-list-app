const express = require("express")
const router = express.Router()
const db = require("../db/createdb.js")

//[PK] You need more whitespace --
//const db = require(...) >> const db= require(...)
//{ include: [{ all: true }] } >> {include:[{all:true}]}

router.get("/", async (req, res, next) => {
	const allUsers = {} //[PK] -- Why this extra layer of nesting?
	allUsers.users = await db.Users.findAll({ include: [{ all: true }] })
	res.json(allUsers)
})

router.post("/", async (req, res, next) => {
	try {
		await db.Users.findOrCreate({
			where: {
				name: req.body.name,
				value: req.body.value,
			},
		})
		res.redirect("/")
	} catch (err) {
		next(err)
	}
})

router.delete("/:name", (req, res, next) => {
	try {
		db.Users.destroy({
			where: {
				name: req.params.name,
			},
		})
		res.redirect("/")
	} catch (err) {
		next(err)
	}
})
router.put("/:name", (req, res, next) => {
	try {
		db.Users.update(
			{ value: req.body.value },
			{
				where: {
					name: req.params.name,
				},
			}
		)
		res.redirect("/")
	} catch (err) {
		next(err)
	}
})
module.exports = router
