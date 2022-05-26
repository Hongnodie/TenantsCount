const jwt = require('jsonwebtoken');

const verifyToken = (res, req, next) => {
    // console.log(req.req.cookies);
    const token =  req.req.cookies.access_token;
    if(!token) {
        return res.status(500).json("You are not authenticated");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
        if(err) return res.status(403).json("Secret Key didn't pass check");
        // console.log(decodedToken);
        req.user = decodedToken.data;
        // console.log(req.username);
        next()
    })
}

module.exports = {
    signToken: function ({ _id, username, isAdmin }) {
        const payload = { _id, username, isAdmin };
        return jwt.sign({ data: payload }, process.env.SECRET_KEY, { expiresIn: process.env.TOEKN_EXPIRE });
    },
    verifyToken,
    verifyUser: function (res, req, next) {
        verifyToken(res, req, next, ()=>{
            if(req.user.id === req.params.id || req.user.isAdmin) {
                next()
            } else {
                return res.status(403).json("Token is incorrect (for another account)");
            }
        })
    },
    verifyAdmin: function (res, req, next) {
        verifyToken(res, req, next, ()=>{
            if(req.user.isAdmin) {
                next()
            } else {
                console.log(res);
                return res.status(403).json("This is not an admin account)");
            }
        })
    },
};