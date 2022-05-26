const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
	{
		hotelname: {
			type: String,
			require: true,
		},
		acctype: {
			type: String,
			// require: true,
		},
		hotelcity: {
			type: String,
			// require: true,
		},
		hoteladdress: {
			type: String,
			// require: true,
		},
        hoteldistance: {
			type: String,
			// require: true,
		},
        hoteldesc: {
			type: String,
			// require: true,
		},
        hotelphotos: {
			type: [String]
		},
        hotelrating: {
			type: String,
            min:0,
            max:5
		},
        hotelrooms: {
			type: [String],
		},
        cheapestprice: {
			type: Number,
            // require: true
		},
        featured: {
			type: Boolean,
            default: false
		},
	},
	{ timestamps: true }
);

const HotelRoomSchema = new mongoose.Schema(
	{
		roomtype: {
			type: String,
			require: true,
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

const HotelModel = mongoose.model("Hotel", HotelSchema);
const HotelRoomModel = mongoose.model("Room", HotelRoomSchema);

module.exports = {HotelModel, HotelRoomModel}