const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
// const flash = require('express-flash');
const connectDB = require('./config/database');


require('dotenv').config({path: './config/.env'});

const PORT = process.env.PORT || 8500;

// passport config
// require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs')
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(logger('dev'))

// app.use(flash());

// ROUTERS

const homeRoutes = require('./routes/homeRoutes');
// const userRoutes = 

app.use('/', homeRoutes);
// app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});