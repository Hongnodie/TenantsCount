const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
		},
		title: {
			type: String,
			require: true,
			min: 3,
		},
		desc: {
			type: String,
			require: true,
			min: 5,
		},
		lat: {
			type: Number,
			require: true,
		},
        long: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);

const PinModel = mongoose.model('Pin', PinSchema);

module.exports = PinModel;