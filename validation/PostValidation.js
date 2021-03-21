const DevToolkit = require('../util/DevToolkit');
const { AVAILABLE_FILTER } = require('../util/constants');
const { VALID_SORT_DIRECTION } = require('../util/constants');

module.exports = class PostValidation {
  static checkTagSortAndDirection(tags, filter, direction) {
    let errors = {};

    if (DevToolkit.isEmpty(tags)) {
      errors.tags = 'tags parameter is required';
    }

    if (!DevToolkit.isEmpty(filter)) {
      if (!AVAILABLE_FILTER.includes(filter)) {
        errors.sortBy = 'sortBy parameter is invalid';
      }
    }

    if (!DevToolkit.isEmpty(direction)) {
      if (!VALID_SORT_DIRECTION.includes(direction)) {
        errors.tags = 'direction parameter is invalid';
      }
    }

    return {
      errors,
      isValid: Object.keys(errors).length == 0,
    };
  }
};
