const router=require('express').Router();

// const Restaurant = require('../models/RestaurantRequest.model');
const Reservation=require('../models/reservation.model');


router.route('/').get((req, res) => {
    // const offers=Offers.find().populate('restaurant');
    // if(!offers)
    // {
    //     res.status(400).json({success:false})
    // }
    // res.send(offers)
    Reservation.find()
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  console.log('inside reservation---');
    const user = req.body.user;
    const restaurant = req.body.restaurant;
    const seats = Number(req.body.seats);
    const reservation_time = req.body.reservation_time;
    const reservation_date=Date.parse(req.body.reservation_date);
    const status=false;
 
    // if (!seats.toString() || !reservation_time.toDateString() || !reservation_date.toString())
    // return res.status(400).json({ msg: "Not all details are filled "});


  const newReservation = new Reservation({
      user,
      restaurant,
      seats,
      reservation_time,
      reservation_date,
      status
    });
    // console.log('da')
  newReservation.save()
    .then(() => res.json('Reservation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
  Reservation.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Reservation deleted!'))
  .catch(err=>res.status(400).json('error:'+err));
});

router.route('/:id/:ff').post((req, res) => {
  Reservation.findByIdAndUpdate(req.params.id,{$set:{
    status: req.params.ff
  } })
    .then(restaurants=>res.json(restaurants.status))
    .catch(err => res.status(400).json('Error: ' + err));
   

});

router.route('/view/:id').get((req, res) => {
  if (req.params.id==0)
    return res.status(400).json({ msg: "Please Select Restaurant "});
  Reservation.find({ restaurant: req.params.id })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get
// app.use('/customer', ViewCustomersRouter);
module.exports = router;