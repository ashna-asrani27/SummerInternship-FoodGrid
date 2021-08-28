const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const MembershipSchema=new Schema({
    membershipname:{type:String,required:true},
    membershipprice:{type:Number,required:true},
    membershipdes:{type:String,required:true}
  

});

module.exports=mongoose.model('membership',MembershipSchema);