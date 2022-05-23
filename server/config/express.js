/* initiate the server knox */

/* first introduce all the npm or dependencies */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const pinRoute = require('../routes/mapview/pins');
const userRoute = require('../routes/mapview/users');

module.exports.init = () => {
    /* connect to database */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(() => {
		console.log("MongoDB Connected Successfully!!");
	})
	.catch((e) => {
		console.log(e);
	});;

    // initialize backend(server) - activating express as function
    const app = express();

    // middleware add and apply before router/controller
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());

    // add a router
    app.use('/mapview/pins', pinRoute);
    app.use('/mapview/users', userRoute);

    if (process.env.NODE_ENV === 'production') {
        console.log('running in production mode');
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    } else {
        console.log('running in development mode');
    }

    return app
}

