const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const OrderSchema=new Schema({
    razorpay_order_id:{type:String,required:true},
    razorpay_payment_id:{type:String,required:true},
    userid:{type:Schema.Types.ObjectId,ref:'users',required:true},
    price:{type:Number, required:true}

});

module.exports=mongoose.model('orders',OrderSchema);