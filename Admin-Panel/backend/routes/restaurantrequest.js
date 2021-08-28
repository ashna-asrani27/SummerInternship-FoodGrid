const router=require('express').Router();
let RestaurantRequest=require('../models/RestaurantRequest.model');
const {v4:uuidv4}=require('uuid');
let multer=require('multer');


const DIR='./public/restaurant';
const DIRs='./public/menu';
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if (file.fieldname === "restaurantimages") { // if uploading resume
            cb(null, DIR);
          } else  if (file.fieldname === "menuimages") { // else uploading image
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
        console.log("JHellpo");
        let url=req.protocol+'://'+req.get('host')
      
        const menuFiles=[];
        // //  url=req.protocol+'://'+req.get('host')

       
         console.log("Lenfgjt ")
        for(var i=0;i<req.files.restaurantimages.length;i++)
        {
            console.log("Hel")
            reqFiles.push(url + '/public/restaurant/' + req.files.restaurantimages[i].filename)
        }
        // this.state.restaurantimages.forEach((restaurantimages) => {
        //     reqFiles.push(url + '/public/' + req.restaurantimages[i].filename)
        //   });
    
            for( i=0;i<req.files.menuimages.length;i++)
            {
                console.log("Yup")
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
        //const restaurantimages=reqFiles;
        // const menuimages=menuFiles;
        const status=false;

        if (  !restaurantname || !address || !area )
      return res.status(400).json({ msg: "Not all details are field "});
        var size=phonenumber.toString().length ;
      if (phonenumber.toString().length!== 10)
  return res
    .status(400)
    .json({ msg: "The Phonenumber needs to be at least 10 digit." + size});
    size=pincode.toString().length ;
    if (pincode.toString().length !== 6)
    return res
      .status(400)
      .json({ msg: "The Pincode needs to be at least 6 digit." });

        const newRestaurant=new RestaurantRequest({
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
            status    
        });

        newRestaurant.save()
        .then(()=>res.json(newRestaurant+'Restaurant Added'))
        .catch(err=>res.status(400).json('This is Error: '+err));
    }catch(err)
    {
        res.status(500).json({ error: err.message });
    }
});

router.route('/:id').delete((req,res)=>{
    RestaurantRequest.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Restaurant Request Deleted'))
    .catch(err=>res.status(400).json('error:'+err));
});


// router.route('/:id').get((req, res) => {
//     RestaurantRequest.findById(req.params.id)
//       .then(restaurants=>res.json(restaurants.status))
//       .catch(err => res.status(400).json('Error: ' + err));
     
  
//   });

router.route('/:id').get((req,res)=>{
    RestaurantRequest.findById(req.params.id)
        .then(restaurants=>res.json(restaurants))
        .catch(err=>res.status(400).json('Error: '+err));

})
  
  router.route('/:id/:ff').post((req, res) => {
    RestaurantRequest.findByIdAndUpdate(req.params.id,{$set:{
      status: req.params.ff
    } })
      .then(restaurants=>res.json(restaurants.status))
      .catch(err => res.status(400).json('Error: ' + err));
     
  
  });
module.exports = router;