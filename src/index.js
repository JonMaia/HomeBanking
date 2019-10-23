const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Database initialize
mongoose.connect('mongodb://localhost/homebankingdb')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

// Settings
app.set('port', 3011);

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); 

// Routes
app.use('/user', require('./routes/user_route'));

// Static files
app.use(express.static(__dirname + '/public'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});