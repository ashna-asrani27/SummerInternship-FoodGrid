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
    const user = req.body.user;
    const restaurant = req.body.restaurant;
    const seats = Number(req.body.seats);
    const time = req.body.time;
    const status=false;
console.log("Id"+time)
    if (  !seats || !time )
    return res.status(400).json({ msg: "Not all details are filled "});


  const newReservation = new Reservation({
      user,
      restaurant,
      seats,
      time,
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

// router.route('/:id').get
// app.use('/customer', ViewCustomersRouter);
module.exports = router;