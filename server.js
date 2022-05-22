const express = require('express');
const exhdbInstance = require('express-handlebars');

const app = express();

// Set up Handlebars.js engine with customised view functions
const extendexhdbInstance = exhdbInstance.create({});

// Inform Express.js on which template engine to use
app.engine('handlebars', extendexhdbInstance.engine);
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    // res.send("Hello World")
    res.render('home')
})

app.listen(5000)