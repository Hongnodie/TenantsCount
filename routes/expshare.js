const router = require('express').Router();
const ThreadModel = require('../models/blog/threadsModel')


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
    res.render('./blogSection/blogNewThread', {threads: new ThreadModel()});
    // res.send('router result - Blog section main page');
});

router.post('/', async (req, res) => {
  let threads = new ThreadModel({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })

  try {
    updatedThreads = await threads.save();
    res.redirect(`/expshare/${threads.id}`)
  } catch (e) {
    console.log(e);
    res.render('./blogSection/blogNewThread', {threads: threads})
  }
  
});

router.get('/:id', (req, res) => {
  res.send(req.params.id)
});

module.exports = router;