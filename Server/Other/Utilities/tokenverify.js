const jwt = require('jsonwebtoken');

const tokenverify = (res, req) =>{
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(500).json("You are not authenticated");
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return res.status(403).json("Token is invalid");
        req.user = user;
        next();
    })
}

module.exports = tokenverify;