const passport = require('passport')
const {Strategy} = require('passport-local')
const User = require('../database/schema/User')
const {comparePassword} = require('../utils/helpers')



passport.use(new Strategy(

    {

        usernameField : 'email',

    },async(email, password, done) => {


        console.log(email)
        console.log(password)



        try {

            
            if(!email || !password) throw(new Error("Missing Credentials!!!!")) 


            const userDb = await User.findOne({email})

        if(!userDb)  throw new Error("User Not Found!!!")
            const isValid = comparePassword(password, userDb.password)

            if(isValid){
    
                console.log("Authenticated Successfully!!!")
                done(null, userDb)
                
            }else{
    
                done(null, null)
    
            }
        } catch (error) {
            
            done(error, null)

        }
    }



))