const ControllerUtil = require('../util/ControllerUtil');
const PostService = require('../services/PostService');

module.exports = class PostController {
  /**
   *
   * @api {GET} api/posts?tags=:tags
   * @description Get all posts by tags
   */
  static async getPostByTags(request, response) {
    try {
      let { tags, sortBy, direction } = request.query;
      return response.json(await PostService.getPostByTags(tags, sortBy, direction));
    } catch (error) {
      return ControllerUtil.sendErrorResponse(error, response);
    }
  }
};
