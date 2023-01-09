const {Router} = require('express')
const User = require('../database/schema/User')
const route = Router()

route.post('/login', (req, res) => {

    const {username, password} = req.body 

    req.session.user = {username}


    if(username && password){

        if(req.session.user){

            res.send(req.session.user)
               
        }


    }else{


        res.send(401)

    }
})

route.post('/register', async(req, res) => {

    const {username, password, email} = req.body

    const UserInfo = await User.findOne({$or: [{username},  {email}]});

    if(!UserInfo){

        const newUser = await User.create({username, password, email})
        newUser.save()

        
    }else{

    
        res.status(400).send({msg : "User Already Exit!!!"})

    }




})

module.exports = route

