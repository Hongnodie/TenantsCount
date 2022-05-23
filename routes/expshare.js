const router = require('express').Router();
const threadDb = require('../models/blog/threadsModel')


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

router.post('/', async (req, res) => {
  const threads = new threadDb({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })
  try {
    updatedThreads = await threads.save();
    res.redirect(`/expshare/${updatedThreads.id}`)
  } catch (e) {
    res.render('./blogSection/blogNewThread', {expthreads: threads})
  }
  
});

router.get('/:id', (req, res) => {
  
});

module.exports = router;