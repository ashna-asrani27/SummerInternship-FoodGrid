let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let mongo = require('./db/database.js');

let cors = require('cors');

const restaurantrequest = require('../backend/routes/restaurantrequest');
const offers=require('../backend/routes/offers');
const ratings=require('../backend/routes/ratings');
const items=require('../backend/routes/items')
const signup=require('../backend/routes/signup')
const owner=require('../backend/routes/owners')
const reservation=require('../backend/routes/reservation')
const membership=require('../backend/routes/membership')
const orderd=require('../backend/routes/order')
const addtocart=require('./routes/addtocart')
const memberuser=require('./routes/memberuser')
const foodorder=require('./routes/foodorder')

mongoose.Promise = global.Promise;
    mongoose.connect(mongo.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('Database connected')
    },
    err => {
        console.log(err)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.urlencoded({
    extended: false
}));

app.use(cors());

app.use('/public', express.static('public'));
app.use('/restaurantrequest', restaurantrequest);
app.use('/offers',offers);
app.use('/ratings',ratings);
app.use('/item',items);
app.use('/signup',signup);
app.use('/owner',owner);
app.use('/reservation',reservation);
app.use('/rating',ratings);
app.use('/membership',membership);
app.use('/order',orderd);
app.use('/addtocart',addtocart);
app.use('/memberuser',memberuser);
app.use('/foodorder',foodorder);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected : ' + port)
})

// app.use((req, res, next) => {
//     setImmediate(() => {
//         next(new Error('Error occured'));
//     });
// });
