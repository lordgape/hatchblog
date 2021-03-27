const AppResponse = require('../models/AppResponse');
const ResponseCode = require('../models/ResponseCode');
const AppError = require('../models/AppError');
const ErrorUtil = require('../util/ErrorUtil');
const PostValidation = require('../validation/PostValidation');
const PostLibrary = require('../util/PostLibrary');
module.exports = class PostService {
  /**
   *
   * @param {String} tags post's tags
   * @param {String} sortBy Post filter
   * @param {String} direction sort direction ascending or descending
   * @description Get post by the specified comma separed tags
   */
  static async getPostByTags(tags, sortBy, direction) {
    try {
      // Validate user input
      let { errors, isValid } = PostValidation.checkTagSortAndDirection(tags, sortBy, direction);

      if (!isValid) {
        throw ErrorUtil.generateValidationError(errors);
      }

      // Get all Post by tags
      let listOfTags = tags.split(',');

      let allPostByTags = await PostLibrary.getPostByTags(listOfTags);

      // Combine and remove duplicate when search for posts with multiple tags
      if (listOfTags.length > 1) {
        // Combine Post
        allPostByTags = PostLibrary.mergeMultiplePost(allPostByTags);

        // Remove Duplicate post.
        allPostByTags = PostLibrary.removeDulplicatePost(allPostByTags);
      }

      //sort post
      allPostByTags.sort(PostLibrary.comparePostByKey(sortBy, direction));

      let foundPosts = allPostByTags ? allPostByTags : [];

      // console.log("foundPosts",foundPosts);

      return new AppResponse(ResponseCode.SUCCESS, foundPosts, []);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(500, ResponseCode.UNKNOWN_ERROR, `Could not get post by tag - ${error.message || ''}`);
    }
  }
};
