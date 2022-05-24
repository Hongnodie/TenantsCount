const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const pinRoute = require('./Routes/Mapview/pin');
const userRoute = require('./Routes/user');

dotenv.config();

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> { console.log('mongoDB connected'); })
    .catch((err)=>{console.log(err)});

app.use('/mapview', pinRoute)

app.listen(5000,()=>{
    console.log('server is running on node.js plus nodemon');
})