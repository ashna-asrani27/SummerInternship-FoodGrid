const router = require('express').Router();
let Owner = require('../models/restaurantowner.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const validatePhoneNumber = require('validate-phone-number-node-js');


router.route('/update/:id').post((req, res) => {
  Owner.findById(req.params.id)
    .then(exercise => {
      exercise.fname = req.body.fname;
      exercise.lname = req.body.lname;
      exercise.address = req.body.address;
      exercise.phonenumber =  Number(req.body.phonenumber);
      exercise.gender = req.body.gender;
      exercise.email = req.body.email;
      exercise.dob = req.body.dob;
      exercise.password=req.body.password;



      exercise.save()
        .then(() => res.json('Membership updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/view/:id').get((req, res) => {
  Owner.findById(req.params.id)
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Owner.findById(req.params.id)
    .then(users => res.json(users.fname))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const address = req.body.address;
  const phonenumber = Number(req.body.phonenumber);
  const email = req.body.email;
  const password = req.body.password;
  const status = true;
  const gender = req.body.gender;
  const dob = req.body.dob;

  if (!fname || !lname || !address || !phonenumber || !email || !password || !gender || !dob )
  return res.status(400).json({ msg: "Not all details are field "});
if (password.length < 5)
  return res
    .status(400)
    .json({ msg: "The password needs to be at least 5 characters long." });

    const result = validatePhoneNumber.validate(phonenumber);
    if (!result)
    return res
      .status(400)
      .json({ msg: "The phonenumber needs to be 10 digit." });

// if (password !== passwordCheck)
//   return res
//     .status(400)
//     .json({ msg: "Enter the same password twice for verification." });

const existingUser = await Owner.findOne({ email: email });
if (existingUser)
  return res
    .status(400)
    .json({ msg: "An account with this email already exists." });

  console.log("Fname -"+fname+" Lname - "+lname+" address - "+address+" phonenumber - "+phonenumber+" email - "+email+" password - "+password+" status - "+status+" gender - "+gender+" dob - "+dob)
  const newUser = new Owner({
      fname,
      lname,
      address,
      phonenumber,
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


router.route('/login').post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
     console.log("Email "+email+" Pass "+password)
    const user = await Owner.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
   
        // if (user.email===email && user.password===password)
        // return res
        //   .status(400)
        //   .json({ msg: "No account with this email has been registered." });

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    if (password!==user.password) return res.status(400).json({ msg: "Invalid credentials." });
    console.log("Hellofrom")
    const token = jwt.sign({ id: user._id }, "zalagaurav", {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
   });
    console.log("token"+token)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
    console.log("hello")
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.use('/customer', ViewCustomersRouter);
module.exports = router;