const express= require('express');
const router= express.Router()
const db= require('../db/createdb.js');

router.get('/', async (req,res,next)=>{
    const allUsers={}
    allUsers.users= await db.Users.findAll({include:[{all:true}]})        
    res.json(allUsers)
})

router.post('/', async (req,res,next)=>{
    try{   
        await db.Users.findOrCreate({
            where:{
                name: req.body.name,
                value: req.body.value
            }
        })
        res.redirect('/')
    }catch (err){
        next(err)
    }
});


router.delete('/:name', (req,res,next)=>{
    try{
        db.Users.destroy({where:{
            name: req.params.name
        }})
        res.redirect('/')

    }catch(err){
        next(err)
    }
})
router.put('/:name', (req,res,next)=>{
    try{
        db.Users.update({value: req.body.value },{
            where:{
                name: req.params.name
            }
        })
        res.redirect('/')

    }catch(err){
        next(err)
    }
})
module.exports= router