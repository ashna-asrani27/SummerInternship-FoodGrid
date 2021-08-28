let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let mongo = require('./db/database');
let cors = require('cors');

const restaurantrequest = require('../backend/routes/restaurantrequest')

mongoose.Promise = global.Promise;
    mongoose.connect(mongo.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify:true
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

app.use(cors());

app.use('/public', express.static('public'));
app.use('/restaurantrequest', restaurantrequest)

const owner=require('./routes/owners');
app.use('/owner', owner)

const item=require('./routes/items');
app.use('/item', item)

const offer=require('./routes/offer');
app.use('/offer', offer)

const ratings=require('./routes/ratings');
app.use('/ratings', ratings)

const reservation=require('./routes/reservation');
app.use('/reservation', reservation)

const order=require('./routes/foodorder');
app.use('/order', order)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected : ' + port)
})

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Error occured'));
    });
});