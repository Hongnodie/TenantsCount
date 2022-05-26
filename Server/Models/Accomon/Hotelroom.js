const mongoose = require("mongoose");

const HotelRoomSchema = new mongoose.Schema(
	{
        hotelid: {
			type: String,
			require: true,
		},
		roomtype: {
			type: String,
			// require: true,
		},
		price: {
			type: Number,
			// require: true,
		},
		maxpeople: {
			type: String,
			// require: true,
		},
		roomdesc: {
			type: String,
			// require: true,
		},
        roomidentitiy: {
			type: [{
				number: Number,
				unavailableDate: [{
					type: [Date]
				}]
			}]
		},
	},
	{ timestamps: true }
);

const HotelRoomModel = mongoose.model("Room", HotelRoomSchema);

module.exports = HotelRoomModel