const {Router} = require('express')

const router = Router();

const marketList = [

    {   
       id : 1,
       store : 'Whole Foods', 
       mile : 2.5,
    
    },

    {
       id : 2,
       store : 'Trader Joes',
       mile : 4.6,
    },

    {
        id : 3,
        store : 'Albertsons',
        mile : 3.6,
    },

    {
        id : 4,
        store : 'Grand Bazaar',
        mile : 7.8,

    },

    
    {
        id : 5,
        store : 'Pike Place Market.',
        mile : 5.5,

    }



]


router.get('', (req, res) => {

    const {mile} = req.query
    const parseMile = parseInt(mile)

    if(!isNaN(parseMile)){

        const filteredMarkets = marketList.filter((m) => m.mile <= parseMile)

        res.send(filteredMarkets)

    }else{

        res.send(marketList)

    }
   
   

    console.log(req.query)

    
})



module.exports = router;