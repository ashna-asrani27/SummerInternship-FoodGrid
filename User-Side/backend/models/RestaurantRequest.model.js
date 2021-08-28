const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const RestaurantRequestSchema=new Schema({
    restaurantname:{type:String,required:true},
    address:{type:String,required:true},
    area:{type:String,required:true},
    longitude:{type:Number,required:true},
    latitude:{type:Number,required:true},
    openingtime:{type:String,required:true},
    closingtime:{type:String,required:true},
    phonenumber: { type: Number, required: true },
    pincode:{type:Number,required:true},
    restauranttype:{type:String,required:true},
    restaurantimages:{type:Array}, 
    menuimages:{type:Array}, 
    status:{type:Boolean,required:true}

},
    {
        collection:'restaurantrequest'
    });

// const RestaurantRequest=mongoose.model('restaurantrequest',RestaurantRequestSchema);
// module.exports=RestaurantRequest;

module.exports = mongoose.model('restaurantrequest', RestaurantRequestSchema)