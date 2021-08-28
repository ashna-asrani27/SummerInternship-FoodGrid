const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ReservationSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:'signups',required:true},
    restaurant:{type:Schema.Types.ObjectId,ref:'restaurantrequest',required:true},
    seats:{type:Number,required:true},
    time:{type:String, required:true},
    status:{type:Boolean,required:true}

});

module.exports=mongoose.model('reservations',ReservationSchema);