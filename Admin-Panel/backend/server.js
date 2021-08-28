const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const signupRouter = require('./routes/signup');
// const membershipRouter = require('./routes/membership');


app.use('/signup', signupRouter);

const ownersRouter=require('./routes/owners');
app.use('/owners',ownersRouter);
app.use('/public', express.static('public'));

// app.use('/membership', membershipRouter);
const restaurantrequest=require('./routes/restaurantrequest');
app.use('/restaurantrequest',restaurantrequest);

const memberuser=require('./routes/memberuser');
app.use('/memberuser',memberuser);

const membership=require('./routes/membership');
app.use('/membership',membership);

const ownerpayment=require('./routes/ownerpayment');
app.use('/ownerpayment',ownerpayment);

const order=require('./routes/foodorder');
app.use('/order',order);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
