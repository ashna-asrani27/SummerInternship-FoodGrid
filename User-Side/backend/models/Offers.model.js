const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const OfferSchema=new Schema({
    offername:{type:String,required:true},
    discount:{type:Number,required:true},
    restaurant:{type:Schema.Types.ObjectId,ref:'owners',required:true},
    description:{type:String, required:true}

});

module.exports=mongoose.model('offers',OfferSchema);