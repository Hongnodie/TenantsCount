const router = require("express").Router();

router.get("/",(req, res) => {
    res.send("hello, this is the household endpoint")
})

module.exports = router;