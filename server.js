const express = require('express');
const exhdbInstance = require('express-handlebars');

const expRouter = require('./routes/expshare');

const app = express();

// Set up Handlebars.js engine with customised view functions
const extendexhdbInstance = exhdbInstance.create({});

// Inform Express.js on which template engine to use
app.engine('handlebars', extendexhdbInstance.engine);
app.set('view engine', 'handlebars');

app.use('/expshare', expRouter);

app.get('/', (req, res) => {
    // res.send("Hello World")
    const expthreads = [{
      title: 'Test experience 1',
      createdAt: new Date(),
      description: 'Test description 1',
    },
    {
      title: 'Test experience 2',
      createdAt: new Date(),
      description: 'Test description 2',
    }];
    res.render('blogPage', {
      expthreads: expthreads
    })
})

app.listen(5000)