const router = require('express').Router();
let Owner = require('../models/restaurantOwner.model');

router.route('/').get((req, res) => {
    Owner.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const Fname = req.body.fname;
  const Lname = req.body.lname;
  const Address = req.body.address;
  const PhoneNumer = Number(req.body.phonenumber);
  const Email = req.body.email;
  const Password = req.body.password;
  const Status = req.body.status;
  const Gender = req.body.gender;
  const DOB = Date.parse(req.body.dob);

  const newUser = new Owner({
      Fname,
      Lname,
      Address,
      PhoneNumer,
      Email,
      Password,
      Status,
      Gender,
      DOB
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  console.log("Hello")
  Owner.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
  Owner.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Owner deleted!'))
  .catch(err=>res.status(400).json('error:'+err));
});

// app.use('/customer', ViewCustomersRouter);
module.exports = router;