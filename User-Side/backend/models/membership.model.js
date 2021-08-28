const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberShipSchema = new Schema({

  membershipname: { type: String, required: true },
  membershipprice: { type: Number, required: true },
  membershipdes: { type: String, required: true }
 
}
);

const MemberShip = mongoose.model('Membership', MemberShipSchema);

module.exports = MemberShip;