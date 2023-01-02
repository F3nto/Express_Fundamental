const {Router} = require('express')

const router = Router();



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


router.get('/' , (req, res) => {

    res.send(groceryList)

  

})

router.get('/:item', (req, res) => {

    const {item} = req.params

    const groceryItem = groceryList.find((g) => g.item === item)

    console.log(item)

    res.send(groceryItem)


})


router.post('/', (req, res) => {

    groceryList.push(req.body)

    res.send(201) 

    console.log(req.body)
})

module.exports = router;


