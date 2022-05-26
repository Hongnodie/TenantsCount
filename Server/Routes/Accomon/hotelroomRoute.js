const router = require("express").Router();
const HotelroomModel = require("../../Models/Accomon/Hotelroom");
const HotelModel = require("../../Models/Accomon/Hotel");
const { verifyToken, verifyUser, verifyAdmin } = require("../../Other/Utilities/token");

// CREATE
router.post("/:hotelId", verifyAdmin, async (req, res) => {
    const hotelId= req.params.hotelId;
    const newRoom = new HotelroomModel(req.body);

    try {
        const savedHotelRoom = await newRoom.save();
        try {
            await HotelModel.findByIdAndUpdate(hotelId, {
                $push : {hotelrooms: savedHotelRoom._id}}
                )
            res.status(200).json(savedHotelRoom);
        } catch (error) {
            next(error);
	    } 
	}   catch (error) {
        next(error);
    }
})

// UPDATE
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
		const updatedHotelroom = await HotelroomModel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
		res.status(200).json(updatedHotelroom);
	} catch (error) {
		res.status(500).json(error);
	}
})

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, async (req, res) => {
    const hotelId= req.params.hotelId;
    try {
		await HotelroomModel.findByIdAndDelete(req.params.id);
        try {
            
            await HotelModel.findByIdAndDelete(hotelId, {
                $pull : {hotelrooms: req.params.id}}
                )
            res.status(200).json("Hotel has been deleted this room");
        } catch (error) {
            next(error);
	    } 
		res.status(200).json("Hotelroom has been deleted");

	} catch (error) {
		res.status(500).json(error);
	}
})

// GET
router.get("/:id", async (req, res) => {
    try {
		const hotelroom= await HotelroomModel.findById(req.params.id);
		res.status(200).json(hotelroom);
	} catch (error) {
		res.status(500).json(error);
	}
})

// GET ALL
router.get("/",async (req, res) => {
    try {
		const hotels= await HotelroomModel.find();
		res.status(200).json(hotels);
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;