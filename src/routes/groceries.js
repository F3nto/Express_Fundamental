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

    
    res.cookie('visited', true, {maxAge:10000})
    res.send(groceryList);

   

})

router.get('/:item', (req, res) => {

    console.log(req.cookies)

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


router.get('/shopping/cart', (req, res) => {

    const {cart} = req.session

    if(!cart){

        res.send("You have no cart session!!!")

    }else{

        res.send(cart)

    }


})

router.post('/shopping/cart/item', (req, res) => {

    const {item , quantity} = req.body

    const cartItem = {item, quantity}

    const {cart} = req.session

    if(cart) {

        cart.items.push(cartItem)
 
    }else{

        req.session.cart = {

            items : [cartItem]

        }


    }

    res.send(201)

    console.log(cartItem)

})

module.exports = router;


