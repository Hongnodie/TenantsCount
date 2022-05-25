const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');

router.post("/register", async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        
		const newUser = await User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
		res.status(200).json("User has been created successfully");
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;