var express = require('express');
const checkAuth = require('../auth/checkAuth');
var router = express.Router();
const models = require('../models')

/* GET posts */
router.get('/', async (req, res) => {
  // TODO get all posts
  const posts = await models.Post.findAll({
      include: [{model: models.User, attributes: ['username', 'id']}],
  })
  
  res.json(posts);
});


// check auth is a middleware
router.post('/', checkAuth, async (req, res) => {

    // check for all fields
    // if some fields missing
    // send 400 error
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({
            error: 'Please include all fields'
        })
    }

    // create new post
    const post = await models.Post.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.user.id
    })

    // send back new post data
    res.status(201).json(post);
})

router.post('/:id/comments', checkAuth, async (req, res) => {
    const post = await models.Post.findByPk(req.params.id)
    if (!post) {
        res.status(404).json({
            error: 'could not find post with that id'
        })
    }

    if (!req.body.text) {
        res.status(400).json({
            error: 'Please include all required fields'
        })
    }

    const comment = await post.createComment({
        text: req.body.text,
        PostId: req.params.id,
        userId: req.session.user.id
    });

    res.status(201).json(comment)
})

router.get('/:id/comments', async (req, res) => {
    const post = await models.Post.findByPk(req.params.id)
    if (!post) {
        res.status(404).json({
            error: 'Could not find post with that id'
        })
    }

    const comments = await post.getComments({
        include: [{model: models.User, attributes: ['username', 'id']}]
    });
    res.json(comments)
})


module.exports = router;