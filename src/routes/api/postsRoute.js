const router = require('express').Router();
const { cacheMiddleware } = require('../../middlewares/cacheMiddleware');
const PostController = require('../../controller/PostController');

/**
 * @route api/posts
 * @desc Get posts by tag route
 * @access Public
 */
router.get('/', cacheMiddleware(30), (req, res) => {

  PostController.getPostByTags(req, res);
});

module.exports = router;
