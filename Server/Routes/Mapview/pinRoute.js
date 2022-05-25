const router = require("express").Router();
const Pin = require("../../Models/Mapview/Pin");

//CREATE PIN
router.post("/", async (req, res) => {
	const newPin = new Pin(req.body);
	try {
		const savedPin = await newPin.save();
		res.status(200).json(savedPin);
	} catch (error) {
		res.status(500).json(error);
	}
});

//GET ALL PINS


//EXPORT ROUTES
module.exports = router;