const router = require("express").Router();
const Hotel = require("../../Models/Accomon/Hotel");

router.get("/",(req, res) => {
    res.send("hello, this is the hotel endpoint")
})

// CREATE+
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		res.status(500).json(error);
	}
})

// UPDATE

// DELETE

// GET

// GETALL

module.exports = router;