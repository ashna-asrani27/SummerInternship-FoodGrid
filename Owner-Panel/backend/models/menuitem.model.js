const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const MenuSchema=new Schema({
    itemname:{type:String,required:true},
    price:{type:Number,required:true},
    restaurantid:{type:mongoose.Schema.Types.ObjectId,ref:'owners',required:true},
    description:{type:String, required:true},
    itemimage:{type:String, required:true}

});

module.exports=mongoose.model('menuitem',MenuSchema);