const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('router result - In articles');
})

module.exports = router;