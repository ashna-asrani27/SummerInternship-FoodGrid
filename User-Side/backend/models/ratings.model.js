const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const RatingsSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'signups',required:true},
    // name:{type:String, required:true},
    restaurant:{type:Schema.Types.ObjectId,ref:'restaurantrequest',required:true},
    rating:{type:Number,required:true},
    review:{type:String, required:true}

});

module.exports=mongoose.model('ratings',RatingsSchema);