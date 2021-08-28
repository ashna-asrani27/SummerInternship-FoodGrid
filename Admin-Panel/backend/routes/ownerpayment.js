const router = require('express').Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth"); 
let OwnerPayment = require('../models/ownerpayment.model');
//const validatePhoneNumber = require('validate-phone-number-node-js');
require('dotenv').config()

const Razorpay=require('razorpay')

const razorpay=new Razorpay({
	key_id:'rzp_test_e783iBejxmOjXy',
	key_secret:'GALkiGYuMvhAE9wnAlgJvpxk',
})


// router.route('/viewmembership').post((req, res) => {
//   razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
//     if(paymentDocument.status =='captured')
//     {
//       res.json("Payment Successfull")
//     }
//   })
//  })
router.route('/view/:id').get((req, res) => {
  if (req.params.id==0)
    return res.status(400).json({ msg: "Please Select Restaurant "});
  OwnerPayment.find({ restaurantid: req.params.id })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});


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


router.route('/:id').get((req, res) => {
    console.log(req.params.id)
    OrderPayment.find({ userid: req.params.id })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const itemid = req.body.itemid;
  const restaurantid = req.body.restaurantid;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_order_id = req.body.razorpay_order_id;
  const email = req.body.email;
  const name = req.body.name;
  const itemname = req.body.itemname;
  const image = req.body.image;
  const price = Number((req.body.price)-(req.body.price*0.2));

  console.log('hi price:::',price);
  const newUser = new OwnerPayment({
    razorpay_payment_id,
    price,
    razorpay_order_id,
    userid,
    name,
    email,
    itemname,
    restaurantid,
    itemid,
    image

    });

  newUser.save()
    .then(() => res.json('payment added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  
});

router.route('/:id').delete((req,res)=>{
    OrderPayment.findByIdAndDelete(req.params.id)
    .then(()=>res.json('order deleted!'))
    .catch(err=>res.status(400).json('error:'+err));
  });
  
  router.route('/').get((req, res) => {
    OwnerPayment.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;