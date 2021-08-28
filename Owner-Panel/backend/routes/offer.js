const router = require('express').Router();
let Offer = require('../models/offer.model');
let RestaurantRequest=require('../models/restaurantrequest.model');

router.route('/').get((req, res) => {
    Offer.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/edit/:id').get((req, res) => {
    console.log("Inside Ba "+req.params.id)
    Offer.findById(req.params.id)
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/view/:id').get((req, res) => {
    if (req.params.id==0)
      return res.status(400).json({ msg: "Please Select Restaurant "});
    Offer.find({ restaurantid: req.params.id })
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').get((req,res)=>{
    RestaurantRequest.find({ restaurantid: req.params.id ,status:true})
    .then(restaurants=>res.json(restaurants))
    .catch(err=>res.status(400).json('Error: '+err));
});


  router.route('/:id').delete((req, res) => {
    Offer.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Offer.findById(req.params.id)
      .then(exercise => {
        exercise.offername = req.body.offername;
        exercise.description = req.body.description;
        exercise.discount = req.body.discount;
    
  
        exercise.save()
          .then(() => res.json('Membership updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post(async (req, res) => {
  try {
    const offername = req.body.offername;
    const discount = Number(req.body.discount);
    const description = req.body.description;
    const restaurantid =req.body.userid;


    // validate

    if (  !offername || !discount || !description || !restaurantid)
      return res.status(400).json({ msg: "Not all details are field "});
   
      

    const existingOffer = await Offer.findOne({ offername : offername });
    if (existingOffer)
      return res
        .status(400)
        .json({ msg: "Already an offer." });

  

   // const salt = await bcrypt.genSalt();
  //  const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Offer({
     offername,
     discount,
     description,
     restaurantid
      
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;