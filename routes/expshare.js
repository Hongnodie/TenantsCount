const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('router result - Blog section main page');
})

module.exports = router;