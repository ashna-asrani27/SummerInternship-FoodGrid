const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/:id').get((req, res) => {
    console.log(req.params.id)
    Order.findOne({ userid: req.params.id })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_order_id = req.body.razorpay_order_id;
  const price = Number(req.body.price);


  const newUser = new Order({
    razorpay_payment_id,
    price,
    razorpay_order_id,
    userid,

    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;