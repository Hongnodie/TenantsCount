const jwt = require('jsonwebtoken');

module.exports = {
    signToken: function ({ username, isAdmin }) {
        const payload = { username, isAdmin };
        return jwt.sign({ data: payload }, process.env.SECRET_KEY, { expiresIn: process.env.TOEKN_EXPIRE });
    },
    verifyToken: function (res, req, next) {
        // console.log(req.req.cookies);
        const token =  req.req.cookies.access_token;
        if(!token) {
            return res.status(500).json("You are not authenticated");
        }
    
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
            if(err) return res.status(403).json("Secret Key didn't pass check");
            // console.log(decodedToken);
            req.username = decodedToken.data.username;
            // console.log(req.username);
            next()
        })
    }
};