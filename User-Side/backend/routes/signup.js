const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); 
const SignUp = require('../models/signup.model');
const validatePhoneNumber = require('validate-phone-number-node-js');

router.route('/').get((req, res) => {
  SignUp.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  SignUp.findById(req.params.id)
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

router.route('/:id').post((req, res) => {
  console.log("Edit Id"+req.params.id)
  SignUp.findById(req.params.id)
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
})

router.route('/view/:id').get((req, res) => {
  SignUp.findById(req.params.id)
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
});


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
    console.log(req.body.fname)
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

    const user = await SignUp.findOne({ email: email });
    console.log("User"+user.lname)
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
      
      // console.log("Hsh"+user)
      // console.log("Hsh"+user.status)
      // if(!user.status)
      // return res
      // .status(400)
      // .json({ msg: "Your Account is Blocked." });

   
      // if (password!==user.password) return res.status(400).json({ msg: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const id=user._id;
    const token = jwt.sign({ id:id  }, "zalagaurav", {
      expiresIn: "120s" // expires in 24 hours
   });
    res.json({
      token,
      user: {
        id: id,
        
      }
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