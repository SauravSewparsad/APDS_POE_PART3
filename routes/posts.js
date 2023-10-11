const router = require('express').Router();
const auth = require('../middleware/auth');
const { Post, validatePost} = require('../models/post');
const { route } = require('./auth');

//Get All Posts
router.get('/', auth, async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
})

router.get('/', auth, async (req, res) => {
    const {error} = validatePost(req.body);
if (error) return res.status(400).json(error.details[0].message)
const post = new Post(req.body);
post.save();

res.send(post)
});

//Create post
router.post('/', auth, async (req, res) =>{
    const {error} = validatePost(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const post = new Post(req.body);
    post.save();

    res.send(post);
})
//Get a single post
router.get('/:id', auth, async (req, res) => {
    const posts = await Post.findById(req.params.id);
    if (posts) return res.send(posts);
    res.sendStatus(404);
})

// Delete a single post by ID
router.delete('/:id', auth, async (req, res) => {
    try {
      const result = await Post.deleteOne({ _id: req.params.id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;