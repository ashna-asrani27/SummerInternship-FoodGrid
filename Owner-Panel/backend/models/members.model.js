const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const MemberSchema=new Schema({
    CouponCode:{type:Number,required:true},
    Membership_start_date:{type:'Date',required:true},
    Membership_end_date:{type:'Date',required:true}
});

const Members=mongoose.model('Members',MemberSchema);
module.exports=Members;