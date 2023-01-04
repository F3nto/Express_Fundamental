const {Router} = require('express')

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

module.exports = route

