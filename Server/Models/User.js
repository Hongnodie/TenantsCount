const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		_id: {
			// Stringify to be compatible with jwttoken
			type: String,
		},
		username: {
			type: String,
			require: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			max: 40,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 8,
            max: 20,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);