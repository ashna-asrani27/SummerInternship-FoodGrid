const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const OwnerPaymentSchema=new Schema({
    razorpay_order_id:{type:String,required:true},
    razorpay_payment_id:{type:String,required:true},
    userid:{type:Schema.Types.ObjectId,ref:'users',required:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    itemname:{type:String,required:true},    
    price:{type:Number, required:true},
    itemid:{type:Schema.Types.ObjectId,ref:'items',required:true},
    restaurantid:{type:Schema.Types.ObjectId,ref:'restaurants',required:true},


});

module.exports=mongoose.model('ownerpayment',OwnerPaymentSchema);