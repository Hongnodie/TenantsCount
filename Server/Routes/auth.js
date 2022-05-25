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

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if(!user) return res.status(500).json("user not found");

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCorrect) return res.status(500).json("password is incorrect");

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;