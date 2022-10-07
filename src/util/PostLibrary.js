const Remote = require('../services/Remote').getInstance();

module.exports = {
  removeDulplicatePost: (listOfPost) => {
    return listOfPost.reduce(
      (acc, val) => {
        if (!acc[val.id]) {
          acc.unique.push(val);
          acc[val.id] = val.id;
        }
        return acc;
      },

      { unique: [] }
    ).unique;
  },

  mergeMultiplePost: (multipleArrayOfPosts) => {
    return multipleArrayOfPosts
      .map((tag) => {
        return tag.posts;
      })
      .flat();
  },

  comparePostByKey: (key, order = 'asc') => (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    let comparison = 0;

    if (typeof a[key] === 'string') {
      comparison = a[key].localCompare(b[key]);
    } else {
      comparison = +a[key] - +b[key];
    }

    return order == 'desc' ? comparison * -1 : comparison;
  },

  getPostByTags: async (listOfTags) => {
    let allTagsPromise = listOfTags.map(async (tag) => {
      return Remote.getPostByTags(tag);
    });

    return Promise.all(allTagsPromise);
  }
};
