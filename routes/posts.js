const express = require('express');
const fakePosts = require('../data/posts');
const comments = require('./comments');

const router = express.Router();

// Get a list of posts
router.get('/', (req, res) => {
  res.json(fakePosts);
});

// Get a single post
router.get('/:postId', (req, res) => {
  // Find the post in the array that has the id given by req.params.id
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const postId = Number(req.params.id);
  const foundPost = fakePosts.find((post) => post.id === postId);
  if (!foundPost) {
    return res.status(404).json({
      error: 'Post not found',
    });
  }
  return res.json(foundPost);
});
// get comment of a post

router.use('/:postId/comments', comments);
router.use('/:postId/comments/:commentId', comments);

module.exports = router;
