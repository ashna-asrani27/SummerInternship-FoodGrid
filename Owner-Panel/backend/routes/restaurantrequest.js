const router=require('express').Router();
let RestaurantRequest=require('../models/restaurantrequest.model');
const {v4:uuidv4}=require('uuid');
let multer=require('multer');
const fs = require('fs');



const DIR='./public/restaurant';
const DIRs='./public/menu';
const storage=multer.diskStorage({
    
    destination:(req,file,cb)=>{
        if (file.fieldname === "restaurantimages") { 
            cb(null, DIR);
          } else  if (file.fieldname === "menuimages") { 
            cb(null, DIRs);
          }
    },
    filename:(req,file,cb)=>{
        if(file.fieldname==="restaurantimages"){
         
        const fileName=file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuidv4()+'-'+fileName);
         }
        else  if (file.fieldname === "menuimages") {
            const fileName=file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuidv4()+'-'+fileName);
         }
        }
        
    
});

var upload=multer({
    storage:storage,
    fileFilter: (req,file,cb)=>{
        if(file.mimetype==="image/png" || file.mimetype==="image/jpg"||file.mimetype==="image/jpeg"){
            cb(null,true);
        }
        else
        {
            cb(null,false);
            return cb(new Error('File type not accepted (.png,.jpg,.jpeg)'));

        }
    }
});


router.route('/').get((req,res)=>{
    RestaurantRequest.find()
    .then(restaurants=>res.json(restaurants))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/edit/:id').get((req, res) => {
    RestaurantRequest.findById(req.params.id)
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req,res)=>{
    RestaurantRequest.find({ restaurantid: req.params.id })
    .then(restaurants=>res.json(restaurants))
    .catch(err=>res.status(400).json('Error: '+err));
});

       router.route('/add').post(upload.fields(
        [
            {
            name:'restaurantimages'
            },
            {
           name:'menuimages'
            }
        ]
    ), async (req,res,next)=>{
        try{
            const reqFiles=[];
            let url=req.protocol+'://'+req.get('host')
          
            const menuFiles=[];

           
             if(!req.files.restaurantimages || req.files.menuimages)
             return res.status(400).json({ msg: "Not all details are field "});
            for(var i=0;i<req.files.restaurantimages.length;i++)
            {
                reqFiles.push(url + '/public/restaurant/' + req.files.restaurantimages[i].filename)
            }
        
                for( i=0;i<req.files.menuimages.length;i++)
                {
                    menuFiles.push(url + '/public/menu/' + req.files.menuimages[i].filename)
                }
              
           

            const restaurantname=req.body.restaurantname;
            const address=req.body.address;
            const area=req.body.area;
            const longitude=Number(req.body.longitude);
            const latitude=Number(req.body.latitude);
            const openingtime=req.body.openingtime;
            const closingtime=req.body.closingtime;
            const phonenumber=Number(req.body.phonenumber);
            const pincode=Number(req.body.pincode);
            const restauranttype=req.body.restauranttype;
            const restaurantid = req.body.restaurantid;
            const status=false;
            const activate=false;
            if (  !restaurantname || !address || !area )
          return res.status(400).json({ msg: "Not all details are field "});
        

            var size=phonenumber.toString().length ;
          if (phonenumber.toString().length!== 10)
      return res
        .status(400)
        .json({ msg: "The Phonenumber needs to be at least 10 digit." + size});
        size=pincode.toString().length;
        if (pincode.toString().length !== 6)
        return res
          .status(400)
          .json({ msg: "The Pincode needs to be at least 6 digit." });

            const newRestaurant=new RestaurantRequest({
                restaurantid,
                restaurantname,
                address,
                area,
                longitude,
                latitude,
                openingtime,
                closingtime,
                phonenumber,
                pincode,
                restauranttype,
                restaurantimages:reqFiles, 
                menuimages:menuFiles,
                status,
                activate    
            });
    
            newRestaurant.save()
            .then(()=>res.json(newRestaurant+'Restaurant Added'))
            .catch(err=>res.status(400).json('This is Error: '+err));
        }catch(err)
        {
            res.status(500).json({ error: err.message });
        }
});



router.route('/vv/:name').get((req,res)=>{
    RestaurantRequest.find({ menuimages: req.params.name })
    .then(restaurants=>res.json(restaurants))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/count/:id').get((req,res)=>{
    RestaurantRequest.find({ restaurantid: req.params.id }).count()
    .then(total=>res.json(total))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/deleteimage/:id').post((req,res)=>{
    RestaurantRequest.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { menuimages: req.body.imagename  } }
     ).catch(err => res.status(400).json('Error: ' + err));

})

router.route('/deleteresimage/:id').post((req,res)=>{
    console.log( req.params.id)
    RestaurantRequest.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { restaurantimages: req.body.imagename  } }
     ).catch(err => res.status(400).json('Error: ' + err));

})

router.route('/updatemenuimage/:id').post(upload.fields(
    [
        {
        name:'restaurantimages'
        },
        {
       name:'menuimages'
        }
    ]
), async (req,res,next)=>{
    try{
        // const reqFiles=[];
        let url=req.protocol+'://'+req.get('host')
      
        const menuFiles=[];
 
    
            for( var i=0;i<req.files.menuimages.length;i++)
            {
                menuFiles.push(url + '/public/menu/' + req.files.menuimages[i].filename)
            }
          
            RestaurantRequest.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { menuimages: menuFiles  } }
             ).catch(err => res.status(400).json('Error: ' + err));
    
    }catch(err)
    {
        res.status(500).json({ error: err.message });
    }
});


router.route('/updateresimage/:id').post(upload.fields(
    [
        {
        name:'restaurantimages'
        },
        {
       name:'menuimages'
        }
    ]
), async (req,res,next)=>{
    try{
        const reqFiles=[];
        let url=req.protocol+'://'+req.get('host')
      
        const menuFiles=[];
 
    
            for( var i=0;i<req.files.restaurantimages.length;i++)
            {
                reqFiles.push(url + '/public/restaurant/' + req.files.restaurantimages[i].filename)
            }
          
            RestaurantRequest.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { restaurantimages: reqFiles  } }
             ).catch(err => res.status(400).json('Error: ' + err));
    
    }catch(err)
    {
        res.status(500).json({ error: err.message });
    }
});



router.route('/activate/:id/:status').post((req, res) => {
    RestaurantRequest.findByIdAndUpdate(req.params.id,{$set:{
      activate: req.params.status
    } })
      .then(user=>res.json(user.activate))
      .catch(err => res.status(400).json('Error: ' + err));
     
  
  });

router.route('/update/:id').post((req, res) => {
    RestaurantRequest.findById(req.params.id)
      .then(exercise => {      
        exercise.restaurantname = req.body.restaurantname;
        exercise.address = req.body.address;
        exercise.area = req.body.area;
        exercise.longitude = req.body.longitude;
        exercise.latitude = req.body.latitude;
        exercise.openingtime = req.body.openingtime;
        exercise.closingtime = req.body.closingtime;
        exercise.phonenumber = req.body.phonenumber;
        
        exercise.pincode = req.body.pincode;
        exercise.restauranttype = req.body.restauranttype;  
        exercise.save()
          .then(() => res.json('Membership updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;