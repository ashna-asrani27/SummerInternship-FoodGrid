const router = require('express').Router();
let Membership = require('../models/membership.model');

router.route('/').get((req, res) => {
    Membership.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/edit/:id').get((req, res) => {
    console.log("Inside Ba "+req.params.id)
    Membership.findById(req.params.id)
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });


//   router.route('/:id').get((req,res)=>{
//     Membership.find(req.params.id)
//     .then(restaurants=>res.json(restaurants))
//     .catch(err=>res.status(400).json('Error: '+err));
// });


  router.route('/:id').delete((req, res) => {
    Membership.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Membership.findById(req.params.id)
      .then(exercise => {
        exercise.membershipname = req.body.membershipname;
        exercise.membershipprice = req.body.membershipprice;
        exercise.membershipdes = req.body.membershipdes;
    
  
        exercise.save()
          .then(() => res.json('Membership updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post(async (req, res) => {
  try {
    const membershipname = req.body.membershipname;
    const membershipprice = Number(req.body.membershipprice);
    const membershipdes = req.body.membershipdes;


    // validate

    if (  !membershipname || !membershipprice || !membershipdes)
      return res.status(400).json({ msg: "Not all details are filled "});
   
      

    const existingMembership = await Membership.findOne({ membershipname : membershipname });
    if (existingMembership)
      return res
        .status(400)
        .json({ msg: "Already a membership type." });

  

   // const salt = await bcrypt.genSalt();
  //  const passwordHash = await bcrypt.hash(password, salt);

    const newMembership = new Membership({
     membershipname,
     membershipprice,
     membershipdes
      
    });
    const savedUser = await newMembership.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;