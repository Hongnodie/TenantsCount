const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();


const userRoute = require('./Routes/userRoute');
const authRoute = require('./Routes/auth');
const hotelRoute = require('./Routes/Accomon/hotelRoute');
const householdRoute = require('./Routes/Accomon/householdRoute');
const pinRoute = require('./Routes/Mapview/pinRoute');

dotenv.config();

// MIDDLEWARE - parsing object
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

// MIDDLEWARE -routing
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/hotel', hotelRoute);
app.use('/household', householdRoute);
app.use('/mapview', pinRoute);

app.listen(5000,()=>{
    connect();
    console.log('server is running on node.js plus nodemon');
})