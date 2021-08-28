const router = require('express').Router();
let AddToCart = require('../models/addtocart.model');

router.route('/:id').get((req, res) => {
    console.log(req.params.id)
    AddToCart.find({ userid: req.params.id })
    .then(users => res.json(users))
    
});

router.route('/:id').delete((req, res) => {
  console.log("Inside This")
  AddToCart.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/find/:id').get((req, res) => {
  AddToCart.findById(req.params.id )
  .then(users => res.json(users))
  
});
router.route('/update/:id').post((req, res) => {
  AddToCart.findByIdAndUpdate(req.params.id,{$set:{
    qty: req.params.qty+1
  }})
  .then(user=>res.json(user.qty))
  .catch(err => res.status(400).json('Error: ' + err));
 

  
});

router.route('/add').post(async (req, res) => {
  const userid = req.body.userid;
  const restaurantid = req.body.restaurantid;
  const restaurantname=req.body.restaurantname;
  const itemid=req.body.itemid;
  const item = req.body.item;
  const qty=1;
    const items =await AddToCart.findOne({ userid: userid, itemid:itemid})
        if(items)
        return res.json("Already Added")         

  const newUser = new AddToCart({
    userid,
    restaurantid,
    restaurantname,
    item,
    itemid,
    qty
    });

  newUser.save()
    .then(() => res.json(' added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;