const router = require('express').Router();
const Pin = require("../../models/mapview/Pin");

// CREATE PIN
router.post("/", async (req, res) => {
	const newPin = new Pin(req.body);
	try {
		const savedPin = await newPin.save();
		res.status(200).json(savedPin);
	} catch (error) {
		res.status(500).json(error);
	}
});

// GET ALL PINS
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;