const express = require('express');
const fakeTags = require('../data/tags');
const fakePosts = require('../data/posts');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(fakeTags);
});

// Get a single post
router.get('/:tagId', (req, res) => {
  // Find the post in the array that has the id given by req.params.id
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const tagId = Number(req.params.tagId);
  const foundTag = fakeTags.find((tag) => tag.id === tagId);
  if (!foundTag) {
    return res.status(404).json({
      error: 'Tag not found',
    });
  }
  return res.json(foundTag);
});

// Get a single post
router.get('/:tagId/posts', (req, res) => {
  const tagId = Number(req.params.tagId);
  // Keep only comments whose post_id matches the postId parameter
  const foundPost = fakePosts.filter((post) => post.tag_ids === tagId);
  res.json(foundPost);
});
module.exports = router;
