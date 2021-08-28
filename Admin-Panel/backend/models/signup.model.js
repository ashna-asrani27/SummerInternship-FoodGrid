const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SignUpSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  address: { type: String, required: true },
  phonenumer: { type: Number, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  gender: { type: String, required: true },
  status: { type: Boolean, required: true }
}
);

const SignUp = mongoose.model('signups', SignUpSchema);

module.exports = SignUp;