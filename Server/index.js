const express = require("express");
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoute = require('./Routes/userRoute');
const authRoute = require('./Routes/auth');
const hotelRoute = require('./Routes/Accomon/hotelRoute');
const hotelroomRoute = require('./Routes/Accomon/hotelroomRoute');
const householdRoute = require('./Routes/Accomon/householdRoute');
const pinRoute = require('./Routes/Mapview/pinRoute');
const counterRoute = require('./Routes/Counter/counterRoute');

dotenv.config();

// MIDDLEWARE - parsing object
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/',(req,res)=> {
res.send("Server is running");
});

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

// MIDDLEWARE -routing
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/hotel', hotelRoute);
app.use('/hotelroom', hotelroomRoute);
app.use('/household', householdRoute);
app.use('/mapview', pinRoute);
app.use('/counter', counterRoute);

app.listen(5000,()=>{
    connect();
    console.log('server is running on node.js plus nodemon');
})