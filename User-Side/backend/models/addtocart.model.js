const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const CheckoutSchema=new Schema({
    item: { type: Object, required: true },
    userid:{type:Schema.Types.ObjectId,ref:'users',required:true},
    restaurantname: { type: String, required: true },
    qty: { type: Number, required: true },
    itemid:{type:Schema.Types.ObjectId,ref:'items',required:true},
    restaurantid:{type:Schema.Types.ObjectId,ref:'restaurants',required:true},
});

const Checkout=mongoose.model('addtocart',CheckoutSchema);
module.exports=Checkout;