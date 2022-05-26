const router = require("express").Router();
const User = require("../Models/User");
const { verifyToken } = require("../Other/Utilities/token");

// TEST
router.get("/checktoken", (req, res) => {
    res.send("token works")
})

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        // findByIdAndUpdate return the previous data from DB, thus countered with new: true
		const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json(error);
	}
})

// DELETE
router.delete("/:id", async (req, res) => {
    try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted");
	} catch (error) {
		res.status(500).json(error);
	}
})

// GET
router.get("/:id",async (req, res) => {
    try {
		const Users= await User.findById(req.params.id);
		res.status(200).json(Users);
	} catch (error) {
		res.status(500).json(error);
	}
})

// GETALL
router.get("/",async (req, res) => {
    try {
		const Users= await User.find();
		res.status(200).json(Users);
	} catch (error) {
		res.status(500).json(error);
	}
})



module.exports = router;