const {Router} = require('express')
const User = require('../database/schema/User')
const {hashPassword,comparePassword} = require('../utils/helpers')
const passport = require('passport')
const route = Router()

// route.post('/login', async(req, res) => {

//     const {password, email} = req.body

//     const userDb = await User.findOne({email})

//     if(!userDb) return res.send(401);

//     const isValid = comparePassword(password, userDb.password)


//     if(isValid){

//       console.log('Authenticated Successfully!!!');
        
//       req.session.user = userDb

//       return res.send(200)

//     }else{

//      console.log('Failed Authenticated!!!')

//      return res.send(401)


//     }



// })

route.post('/login', passport.authenticate('local'), (req, res) => {

    console.log("Logged In")

    return res.send(200);

})




route.post('/register', async(req, res) => {

    const {email} = req.body
    const password = hashPassword(req.body.password)

    const UserInfo = await User.findOne({email});

    if(!UserInfo){

    
        const newUser = await User.create({email, password})
        newUser.save()

        console.log("Hash Password.....", password)

        res.send(201)
        
    }else{

    
        res.status(400).send({msg : "User Already Exit!!!"})

    }
    
})

module.exports = route

