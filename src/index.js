const express = require('express');
const groceriesRoute = require('./routes/groceries')
const marketRouter = require('./routes/markets')

require('dotenv').config()

const app = express()

app.use(express.json())

app.use(express.urlencoded())

app.use((req, res, next) => {
    
    console.log(`${req.url} : ${req.method}`) 
    
    next();

})
 
app.use('/api/v1/grocery',groceriesRoute)
app.use('/api/v1/market', marketRouter)


app.listen(process.env.PORT, () => {console.log(`Server Running ${process.env.PORT}!!!`)})

 