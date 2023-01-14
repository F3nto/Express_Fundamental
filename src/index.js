const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const passport = require('passport')
require('./strategies/local')

//Routes
const authRoute = require('./routes/auth')
const groceriesRoute = require('./routes/groceries')
const marketRoute = require('./routes/markets');


require('dotenv').config()


const app = express()



app.use(express.json())
app.use(express.urlencoded())

app.use(cookieParser())
app.use(session({ 
    
    secret : "FHONFNOWNFWHOF02IOEIF2JIO23RU1344##$%", 
    resave:false, 
    saveUninitialized:false,
    
    store : mongoStore.create({

        mongoUrl : 'mongodb://localhost:27017',

    })

}))



app.use((req, res, next) => {
    
    console.log(`${req.url} : ${req.method}`) 
    
    next();

})



app.use(passport.initialize());
app.use(passport.session())
 
app.use('/api/v1/grocery',groceriesRoute)
app.use('/api/v1/market', marketRoute)
app.use('/api/v1/auth', authRoute)


mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017")
.then(() => console.log("Connecting to DB!!!"))
.catch((error) => console.log(error))



app.listen(process.env.PORT, () => {console.log(`Server Running ${process.env.PORT}!!!`)})


