const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const MemberUserSchema=new Schema({
    razorpay_order_id:{type:String,required:true},
    razorpay_payment_id:{type:String,required:true},
    userid:{type:Schema.Types.ObjectId,ref:'users',required:true},
    email:{type:String,required:true},
    name:{type:String,required:true},
    membershipname:{type:String,required:true},    
    price:{type:Number, required:true}

});

module.exports=mongoose.model('memberuser',MemberUserSchema);