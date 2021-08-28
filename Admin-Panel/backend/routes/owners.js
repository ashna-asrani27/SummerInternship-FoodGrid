const router = require('express').Router();
let Owner = require('../models/restaurantOwner.model');

router.route('/').get((req, res) => {
    Owner.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const address = req.body.address;
  const phonenumer = Number(req.body.phonenumber);
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);

  if (  !fname || !lname ||!address )
  return res.status(400).json({ msg: "Not all details are filled "});
    var size=phonenumber.toString().length ;
  if (PhoneNumber.toString().length!== 10)
return res
.status(400)
.json({ msg: "The Phonenumber needs to be at least 10 digit." + size});

  const newUser = new Owner({
      fname,
      lname,
      address,
      phonenumer,
      email,
      password,
      status,
      gender,
      dob
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
  Owner.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Owner deleted!'))
  .catch(err=>res.status(400).json('error:'+err));
});


router.route('/:id/:ff').post((req, res) => {
  Owner.findByIdAndUpdate(req.params.id,{$set:{
    status: req.params.ff
  } })
    .then(owner=>res.json(owner.status))
    .catch(err => res.status(400).json('Error: ' + err));
   

});
// app.use('/customer', ViewCustomersRouter);
module.exports = router;