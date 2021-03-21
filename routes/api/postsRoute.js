const router = require('express').Router();
const PostController = require('../../controller/PostController');

/**
 * @route api/posts/test
 * @desc Test posts route
 * @access Public
 */
router.get('/', (req, res) => {
  PostController.getPostByTags(req, res);
});

/**
 * @route {POST} api/posts
 * @desc add a post of a logged in user
 * @access Private
 */

module.exports = router;
