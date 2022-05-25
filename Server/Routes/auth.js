const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
    try {
        // find the user by username
        const user = await User.findOne({username:req.body.username});
        if(!user) return res.status(500).json("user not found");

        // verify the password
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCorrect) return res.status(500).json("password is incorrect");

        // hide password and admin condition from user
        const {password, isAdmin, ...otherDetails} = user._doc;

        // generate token to save endless login efforts when jumping from page to page

        // send as json object
		res.status(200).json({otherDetails});
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;