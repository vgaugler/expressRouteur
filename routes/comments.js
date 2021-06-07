const express = require('express');
const fakeComments = require('../data/comments');

const router = express.Router({ mergeParams: true });

// Get a list of comments
router.get('/', (req, res) => {
  // If we forget { mergeParams: true }, req.params.postId will be `undefined`
  const postId = Number(req.params.postId);
  const commId = Number(req.params.commentId);
  // Keep only comments whose post_id matches the postId parameter
  const postComments = fakeComments
    .filter((comment) => comment.post_id === postId)
    .filter((comment) => comment.id === commId);
  res.json(postComments);
});

module.exports = router;
