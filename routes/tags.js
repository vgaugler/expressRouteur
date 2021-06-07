const express = require('express');
const fakeTags = require('../data/tags');
const allPosts = require('../data/posts');

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

router.get('/:tagId/posts', (req, res) => {
  const tagId = Number(req.params.tagId);
  const foundTag = allPosts.filter((post) => post.tag_ids.includes(tagId));
  if (!foundTag) {
    return res.status(404).json({
      error: 'Post not found',
    });
  }
  return res.json(foundTag);
});

module.exports = router;
