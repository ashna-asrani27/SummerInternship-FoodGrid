const router=require('express').Router();
let MenuItem=require('../models/menuitem.model');
const {v4:uuidv4}=require('uuid');
let multer=require('multer');
const fs = require("fs")

const DIR='./public/item';
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if (file.fieldname === "itemimage") { // if uploading resume
            cb(null, DIR);
          }
          
    },
    filename:(req,file,cb)=>{
        if(file.fieldname==="itemimage"){
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
router.route('/:id').get((req,res)=>{
  if (req.params.id==0)
  return res.status(400).json({ msg: "Please Select Restaurant "});
MenuItem.find({ restaurantid: req.params.id })
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res)=>{
  MenuItem.find({ restaurantid: req.params.id })
    .then(restaurants=>res.json(restaurants))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post(upload.single('itemimage'), async (req,res,next)=>{
        try{
            console.log("Id "+req.body.res)

            let url=req.protocol+'://'+req.get('host')
          console.log("Jnejn")
            console.log("ID "+ req.file.filename)
            
            const reqFiles=url +'/public/item/'+req.file.filename;
            const itemname=req.body.itemname;
            const price=Number(req.body.price);
            const description=req.body.description;
            const restaurantid =req.body.res;

          
            //const restaurantimages=reqFiles;
            // const menuimages=menuFiles;
    
            if (  !itemname || !price || !description )
          return res.status(400).json({ msg: "Not all details are field "});
          if (restaurantid==0)
          return res.status(400).json({ msg: "Please Select Restaurant "});

            const newRestaurant=new MenuItem({
                itemname,
                price,
                description,
                itemimage:reqFiles,
                restaurantid
               
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
  MenuItem.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Restaurant Request Deleted'))
        .catch(err=>res.status(400).json('error:'+err)); 
})
// router.route('/:id').delete((req,res)=>{
//   console.log("ID "+req.params.id)
//   const pathToFile = req.body.itemname;
//   console.log("Path "+pathToFile)
//   fs.unlinkSync(pathToFile, function(err) {
//     if (err) {
//       throw err
//     } else {
//       MenuItem.findByIdAndDelete(req.params.id)
//       .then(()=>res.json('Restaurant Request Deleted'))
//       .catch(err=>res.status(400).json('error:'+err));    }
//   })
 
// })

router.route('/edit/:id').get((req, res) => {
  console.log("Inside Ba"+req.params.id)
  MenuItem.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post(upload.single('itemimage'), async (req,res,next)=>{
  MenuItem.findById(req.params.id)
    .then(exercise => {
      exercise.itemname = req.body.itemname;
      exercise.description = req.body.description;
      exercise.price = req.body.price;
  

      exercise.save()
        .then(() => res.json('MenuItem updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;