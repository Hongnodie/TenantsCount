const router = require('express').Router();

router.get('/new', (req, res) => {
    res.render('./blogSection/blogNewThread');
    // res.send('router result - Blog section main page');
})

module.exports = router;