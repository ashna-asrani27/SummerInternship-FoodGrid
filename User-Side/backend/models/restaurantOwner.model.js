const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const OwnerSchema=new Schema({
    Fname:{type:String,required:true},
    Lname:{type:String,required:true},
    Address:{type:String,required:true},
    PhoneNumber:{type:Number,required:true},
    DOB:{type:Date,required:true},
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    Gender:{type:String,required:true},
    Status:{type:Boolean,required:true}

});

const Owner=mongoose.model('owners',OwnerSchema);

module.exports=Owner;