// let express=require('express');
// let mongoose=require('mongoose');
// const {v4:uuidv4}=require('uuid');
// let multer=require('multer');
// let router=express.Router();

// const DIR='./public/';
// let RestaurantImage=require('../models/restaurant_image');

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,DIR);
//     },
//     filename:(req,file,cb)=>{
//         const fileName=file.originalname.toLowerCase().split(' ').join('-');
//         cb(null,uuidv4()+'-'+fileName)
//     }
// });

// var upload=multer({
//     storage:storage,
//     fileFilter: (req,file,cb)=>{
//         if(file.mimetype=="image/png" || file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"){
//             cb(null,true);
//         }
//         else
//         {
//             cb(null,false);
//             return cb(new Error('File type not accepted (.png,.jpg,.jpeg)'));

//         }
//     }
// });

// router.post('/multi-images-upload',upload.array('RestaurantImages',5),(req,res,next)=>{
//     const reqFiles=[];
//     const url=req.protocol+'://'+req.get('host')
//     for(var i=0;i<req.files.length;i++)
//     {
//         reqFiles.push(url + '/public/' + req.files[i].filename)

     
//     }
//     const restaurantimage=new RestaurantImage({
//         RestaurantImages:reqFiles,
//         RestaurantRequest_id: mongoose.Schema.Types.ObjectId()
//     });

//      restaurantimage.save()
//         .then(()=>res.json('RestaurantImage Added'))
//         .catch(err=>res.status(400).json('Error: '+err));
    
// })

// router.get("/", (req, res, next) => {
//     RestaurantImage.find().then(response => {
//         res.status(200).json({
//             message: "Images fetched!",
//             posts: response
//         });
//     });
// });

// module.exports = router;