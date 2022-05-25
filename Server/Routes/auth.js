const router = require("express").Router();

router.get("/",(req, res) => {
    res.send("hello, this is the auth endpoint")
})

export default router