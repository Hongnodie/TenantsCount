const express = require('express');
const exhdbInstance = require('express-handlebars');

const expRouter = require('./routes/expshare');
const dbConnect = require('./other/dbConnect');

const app = express();

// Set up Handlebars.js engine with customised view functions
const extendexhdbInstance = exhdbInstance.create({});

// Inform Express.js on which template engine to use
app.engine('handlebars', extendexhdbInstance.engine);
app.set('view engine', 'handlebars');

// Allow to extract html element from form object, i.e. req.body.decription
app.use(express.urlencoded({ extended: false }));

app.use('/expshare', expRouter);

app.listen(5000)