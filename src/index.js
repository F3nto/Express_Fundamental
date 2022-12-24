const express = require('express');

require('dotenv').config()

const app = express()

app.use(express.json())

app.use(express.urlencoded())

let groceryList = [

    {

        "item" : "milk",
        "quantity" : "2",

    },

    {

        "item" : "Oak Meal",
        "quantity" : "2",

    },


    {

        "item" : "Soda",
        "quantity" : "2",

    },

]


app.get('/grocery' , (req, res) => {

    res.send(groceryList)

})


app.post('/grocery', (req,res) => {

    groceryList.push(req.body)

    res.send(201) 

    console.log(req.body)
})

app.listen(process.env.PORT, () => {console.log(`Server Running ${process.env.PORT}!!!`)})

