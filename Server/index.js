const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const pinRoute = require('./Routes/Mapview/pinRoute');
const userRoute = require('./Routes/userRoute');
const authRoute = require('./Routes/auth');

dotenv.config();

app.use(express.json());

const connect = async () => {
    await mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> { console.log('mongoDB connected'); })
    .catch((err)=>{console.log(err)});
}

// TRACK Disconnect or re-connect
mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", ()=> {
    console.log("mongoDB connected")
})

app.get("/", (req,res)=>{
    res.send("hello")
})

// MIDDLEWARE
app.use('/mapview', pinRoute)

app.use('/auth', authRoute)

app.listen(5000,()=>{
    connect();
    console.log('server is running on node.js plus nodemon');
})