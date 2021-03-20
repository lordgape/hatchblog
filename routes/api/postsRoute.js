const router = require('express').Router();

/**
 * @route api/posts/test
 * @desc Test posts route
 * @access Public
 */
router.get('/', (req, res) => {
  res.json({ result: 'posts router is working' });
});

/**
 * @route {POST} api/posts
 * @desc add a post of a logged in user
 * @access Private
 */

module.exports = router;
