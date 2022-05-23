const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send("Hello World")
    const expthreads = [{
      title: 'Test experience 1',
      createdAt: new Date(),
      description: 'Test description 1',
    },
    {
      title: 'Test experience 2',
      createdAt: new Date(),
      description: 'Test description 2',
    }];
    res.render('./blogSection/blogHomePage', {
      expthreads: expthreads
    })
})

router.get('/new', (req, res) => {
    res.render('./blogSection/blogNewThread');
    // res.send('router result - Blog section main page');
});

router.post('/', (req, res) => {

});

module.exports = router;