const router=require('express').Router();
let Members=require('../models/members.model');

router.route('/').get((req,res)=>{
    Members.find()
    .then(members=>res.json(members))
    .catch(err=>res.status(400).json('Error:'+err));

});

router.route('/:id').delete((req,res)=>{
    Members.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Member deleted'))
    .catch(err=>res.status(400).json('error:'+err));
});
