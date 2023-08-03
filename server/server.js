const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const logger = require('morgan');
const connectDB = require('./config/database');

require('dotenv').config({path: './config/.env'});

const PORT = process.env.PORT || 8500;

connectDB();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(logger('dev'))

// sessions

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
}));

// routers

const homeRoutes = require('./routes/homeRoutes');

app.use('/', homeRoutes);
// app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});