const router = require("express").Router();

router.get("/",(req, res) => {
    res.send("hello, this is the user endpoint")
})

module.exports = router;