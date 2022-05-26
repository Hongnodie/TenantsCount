const router = require("express").Router();
const HotelModel = require("../../Models/Accomon/Hotel");

// COUNT
// Hotels by city
router.get("/city",async (req, res) => {
    // get cityname string from URL(/?cities=London,Berlin,Singapole)
    const cities = req.query.cities.split(",")
    try {
		const list = await Promise.all(cities.map(city=>{
            return HotelModel.countDocuments({hotelcity:city})
        }))
		res.status(200).json(list);
	} catch (error) {
		res.status(500).json(error);
	}
})

// Hotels by type
router.get("/type", async (req, res) => {
    const typeOptions = ["hotel","studio","apartment","cabin","house","townhouse"];
    try {
		let typeCounttest = await Promise.all(typeOptions.map(types=>{
            let typesNumber = HotelModel.countDocuments({acctype:types});
            return typesNumber;
        }))
        let typeList = [];
        for (let i =0; i<typeOptions.length-1; i++) {
            typeList.push({type: typeOptions[i], count: typeCounttest[i]})
        }
		res.status(200).json(typeList);
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;