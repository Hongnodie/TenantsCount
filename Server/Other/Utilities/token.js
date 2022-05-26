const jwt = require('jsonwebtoken');

module.exports = {
    signToken: function ({ username, isAdmin }) {
        const payload = { username, isAdmin };
        return jwt.sign({ data: payload }, process.env.SECRET_KEY, { expiresIn: process.env.TOEKN_EXPIRE });
    },
    verifyToken : function (res, req, next) {
        let token =  req.cookies.access_token;
        console.log(token);
        if(!token) {
            return res.status(500).json("You are not authenticated");
        }
    
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
            if(err) return res.status(403).json("Secret Key didn't pass check");
            req.username = decodedToken.username;
            next()
        })
    }
};