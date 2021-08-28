const router=require('express').Router();
// const { cilRestaurant } = require('@coreui/icons');
let Offers=require('../models/Offers.model');
const Owner = require('../models/restaurantOwner.model');
let Owners=require('../models/restaurantOwner.model');
// let RestaurantRequest=('../models/')


router.route('/').get((req, res) => {
    // const offers=Offers.find().populate('restaurant');
    // if(!offers)
    // {
    //     res.status(400).json({success:false})
    // }
    // res.send(offers)
    Offers.find()
    .then(offers => res.json(offers))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  // Owners.findById(req.body.restaurant)
  // .then(console.log('present'))
  // .catch(err=>res.status(400).json('Error: '+err))
  
  const offername = req.body.offername;
  const discount = Number(req.body.discount);
 const restaurant = req.body.restaurant;
  const description = req.body.description;

  const restaurantid=Owners.findById(req.body.restaurant);
    if(!restaurantid)
    {
        return res.status(400).send('Invalid Restaurant')
    } 
  

  const newOffer = new Offers({
      offername,
      discount,
      restaurant,
      description
    });
    // console.log('da')
  newOffer.save()
    .then(() => res.json('Offer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
  Offers.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Offer deleted!'))
  .catch(err=>res.status(400).json('error:'+err));
});

// router.route('/:id').get
// app.use('/customer', ViewCustomersRouter);
module.exports = router;