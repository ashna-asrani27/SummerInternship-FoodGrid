const router = require('express').Router();
let MemberUser = require('../models/memberuser.model');

router.route('/:id').get((req, res) => {
    console.log(req.params.id)
    MemberUser.findOne({ userid: req.params.id })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_order_id = req.body.razorpay_order_id;
  const email = req.body.email;
  const name = req.body.name;
  const membershipname = req.body.membershipname;
  const price = Number(req.body.price);
  const status=false;


  const newUser = new MemberUser({
    razorpay_payment_id,
    price,
    razorpay_order_id,
    userid,
    name,
    email,
    membershipname,
    status

    });

  newUser.save()
    .then(() => res.json('MemberUser added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    MemberUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
    MemberUser.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Member deleted!'))
    .catch(err=>res.status(400).json('error:'+err));
})

router.route('/:id/:ff').post((req, res) => {
    MemberUser.findByIdAndUpdate(req.params.id,{$set:{
      status: req.params.ff
    } })
      .then(owner=>res.json(owner.status))
      .catch(err => res.status(400).json('Error: ' + err));
     
  
  });

module.exports = router;