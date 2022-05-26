const router = require("express").Router();
const HotelModel = require("../../Models/Accomon/Hotel");
const { verifyToken, verifyUser, verifyAdmin } = require("../../Other/Utilities/token");

// CREATE
router.post("/", verifyAdmin, async (req, res) => {
    const newHotel = new HotelModel(req.body);
    try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		res.status(500).json(error);
	}
})

// UPDATE
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        // findByIdAndUpdate return the previous data from DB, thus countered with new: true
		const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
		res.status(200).json(updatedHotel);
	} catch (error) {
		res.status(500).json(error);
	}
})

// DELETE
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
		await HotelModel.findByIdAndDelete(req.params.id);
		res.status(200).json("Hotel has been deleted");
	} catch (error) {
		res.status(500).json(error);
	}
})

// GET
router.get("/:id", async (req, res) => {
    try {
		const hotels= await HotelModel.findById(req.params.id);
		res.status(200).json(hotels);
	} catch (error) {
		res.status(500).json(error);
	}
})

// GET ALL
router.get("/",async (req, res) => {
	const {min, max, ...otherQuerys} =req.query;
    try {
		const hotels= await HotelModel.find({
			...otherQuerys,
			cheapestprice: {$gt:min | 1, $lt:max || 999}
		}).limit(req.query.limit);
		res.status(200).json(hotels);
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;