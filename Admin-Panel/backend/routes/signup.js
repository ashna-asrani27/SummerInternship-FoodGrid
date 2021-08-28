const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); 
let SignUp = require('../models/signup.model');
const validatePhoneNumber = require('validate-phone-number-node-js');

router.route('/').get((req, res) => {
  SignUp.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  SignUp.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   SignUp.findById(req.params.id)
//     .then(user=>res.json(user.status))
//     .catch(err => res.status(400).json('Error: ' + err));
   

// });

router.route('/:id/:ff').post((req, res) => {
  SignUp.findByIdAndUpdate(req.params.id,{$set:{
    status: req.params.ff
  } })
    .then(customers=>res.json(customers.status))
    .catch(err => res.status(400).json('Error: ' + err));
   

});
// router.route('/chan/:bind').post((req, res) => {
//   SignUp.update({_id:req.params.bind.id},{$set:{status:req.params.bind.state}})
//     .then(exercises => (exercises.status))
//     .catch(err => res.status(400).json('Error: ' + err));
// });



router.route('/add').post((req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const address = req.body.address;
  const phonenumber = Number(req.body.phonenumber);
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);

  const newUser = new SignUp({
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




router.route('/register').post(async (req, res) => {
  try {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const address = req.body.address;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;
    const password = req.body.password;
    const status = true;
    const gender = "male";
    const dob = Date.parse(req.body.dob);


    // validate

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

    const existingUser = await SignUp.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

  

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new SignUp({
      fname,
      lname,
      address,
      phonenumber,
      email,
      password: passwordHash,
      status,
      gender,
      dob   
      
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/login').post(async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = 'admin@gmail.com'
    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ msg: "No account with this email has been registered." });

    const isMatch = (password, 'admin');
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const id="60e6d8e28d3e9b4895c729a1";
    const token = jwt.sign({ id: id }, "zalagaurav");
    res.json({
      token,
      user: {
        id: id,      
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const deletedUser = await SignUp.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await SignUp.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await SignUp.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});


module.exports = router;