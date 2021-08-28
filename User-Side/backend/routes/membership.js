const router = require('express').Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth"); 
let MemberShip = require('../models/membership.model');
//const validatePhoneNumber = require('validate-phone-number-node-js');
require('dotenv').config()

const Razorpay=require('razorpay')

const razorpay=new Razorpay({
	key_id:'rzp_test_e783iBejxmOjXy',
	key_secret:'GALkiGYuMvhAE9wnAlgJvpxk',
})


router.route('/viewmembership').post((req, res) => {
  razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
    if(paymentDocument.status =='captured')
    {
      res.json("Payment Successfull")
    }
  })
 })
 


router.route('/order').post((req, res) => {
 let option={
	 amount:req.body.price*100,
	 currency:"INR",
 }
 razorpay.orders.create(option,function (err,order){
	 console.log(order)
	 res.json(order)
 })
})


router.route('/').get((req, res) => {
    MemberShip.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    MemberShip.findById(req.params.id)
      .then(membership=>res.json(membership))
      .catch(err => res.status(400).json('Error: ' + err));
     
  
  });

  router.route('/:id').delete((req, res) => {
    MemberShip.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    MemberShip.findById(req.params.id)
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
  
router.route('/adds').post((req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const address = req.body.address;
  const phonenumber = Number(req.body.phonenumber);
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);

  const newUser = new MemberShip({
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




router.route('/add').post(async (req, res) => {
  try {
    const membershipname = req.body.membershipname;
    const membershipprice = Number(req.body.membershipprice);
    const membershipdes = req.body.membershipdes;


    // validate

    if (  !membershipname || !membershipprice || !membershipdes )
      return res.status(400).json({ msg: "Not all details are field "});

    const existingUser = await MemberShip.findOne({ membershipname : membershipname });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

  

    const newUser = new MemberShip({
     membershipname,
     membershipprice,
     membershipdes
      
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.route('/login').post(async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     // validate
//     if (!email || !password)
//       return res.status(400).json({ msg: "Not all fields have been entered." });

//     const user = await SignUp.findOne({ email: email });
//     if (!user)
//       return res
//         .status(400)
//         .json({ msg: "No account with this email has been registered." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         fname: user.fname,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const deletedUser = await SignUp.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/tokenIsValid", async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) return res.json(false);

//     const user = await SignUp.findById(verified.id);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/", auth, async (req, res) => {
//   const user = await SignUp.findById(req.user);
//   res.json({
//     displayName: user.displayName,
//     id: user._id,
//   });
// });


module.exports = router;