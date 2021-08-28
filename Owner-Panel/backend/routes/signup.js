const router = require('express').Router();
let SignUp = require('../models/signup.model');

router.route('/').get((req, res) => {
    SignUp.find()
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
  const Status = true;
  const Gender = req.body.gender;
  const DOB = Date.parse(req.body.dob);
  console.log("Fname -"+Fname+" Lname - "+Lname+" address -")
  const newUser = new SignUp({
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

router.route('/:id').delete((req,res)=>{
  SignUp.findByIdAndDelete(req.params.id)
  .then(()=>res.json('Customer deleted!'))
  .catch(err=>res.status(400).json('error:'+err));
});

// app.use('/customer', ViewCustomersRouter);
module.exports = router;