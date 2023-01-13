const passport = require('passport')
const {Strategy} = require('passport-local')
const User = require('../database/schema/User')
const {comparePassword} = require('../utils/helpers')


passport.serializeUser((user, done) => {

    console.log("Serialize User....")

    console.log(user)

    done(null, user.id)


})

passport.deserializeUser( async(id, done) => {


    console.log("Deserialize User.....")
    console.log(id)


    try {

        const user = await User.findById(id)

        if(!user) throw new Error("User Not Found!!!");

        done(null, user)
        
    } catch (error) {

        console.log(error)
        done(error, null)
    }

    


})


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