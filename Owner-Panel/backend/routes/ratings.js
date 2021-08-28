const router=require('express').Router();

// const Restaurant = require('../models/RestaurantRequest.model');
const Ratings=require('../models/ratings.model');


router.route('/').get((req, res) => {
    // const offers=Offers.find().populate('restaurant');
    // if(!offers)
    // {
    //     res.status(400).json({success:false})
    // }
    // res.send(offers)
    Ratings.find()
    .then(ratings => res.json(ratings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/view/:id').get((req, res) => {
  if (req.params.id==0)
    return res.status(400).json({ msg: "Please Select Restaurant "});
  Ratings.find({ restaurant: req.params.id })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // Owners.findById(req.body.restaurant)
  // .then(console.log('present'))
  // .catch(err=>res.status(400).json('Error: '+err))
  console.log('inside ratings!');
    const user = req.body.user;
    const restaurant = req.body.restaurant;
    const rating = Number(req.body.rating);
    const review = req.body.review;

//   const restaurantid=Owners.findById(req.body.restaurant);
//     if(!restaurantid)
//     {
//         return res.status(400).send('Invalid Restaurant')
//     } 
  

  const newRating = new Ratings({
      user,
      restaurant,
      rating,
      review
    });
    // console.log('da')
  newRating.save()
    .then(() => res.json('Rating added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
  Ratings.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Ratings deleted!'))
  .catch(err=>res.status(400).json('error:'+err));
});

// router.route('/:id').get
// app.use('/customer', ViewCustomersRouter);
module.exports = router;