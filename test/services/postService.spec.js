const expect = require('chai').expect;
const nock = require('nock');
const config = require('../../config/config.json');

const PostLibrary = require('../../util/PostLibrary');

const mockUnorderedPosts = [
  {
    author: 'Ahmad Dunn',
    authorId: 7,
    id: 100,
    likes: 573,
    popularity: 0.43,
    reads: 89894,
    tags: ['science', 'design', 'history']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 98,
    likes: 934,
    popularity: 0.5,
    reads: 17307,
    tags: ['design']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 99,
    likes: 473,
    popularity: 0.34,
    reads: 97868,
    tags: ['culture', 'startups', 'tech']
  }
];

const mockDuplicatePosts = [
  {
    author: 'Ahmad Dunn',
    authorId: 7,
    id: 100,
    likes: 573,
    popularity: 0.43,
    reads: 89894,
    tags: ['science', 'design', 'history']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 98,
    likes: 934,
    popularity: 0.5,
    reads: 17307,
    tags: ['design']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 99,
    likes: 473,
    popularity: 0.34,
    reads: 97868,
    tags: ['culture', 'startups', 'tech']
  },
  {
    author: 'Ahmad Dunn',
    authorId: 7,
    id: 100,
    likes: 573,
    popularity: 0.43,
    reads: 89894,
    tags: ['science', 'design', 'history']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 98,
    likes: 934,
    popularity: 0.5,
    reads: 17307,
    tags: ['design']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 99,
    likes: 473,
    popularity: 0.34,
    reads: 97868,
    tags: ['culture', 'startups', 'tech']
  }
];

const mockMultiplePosts = [
  {
    posts: [
      {
        author: 'Ahmad Dunn',
        authorId: 7,
        id: 100,
        likes: 573,
        popularity: 0.43,
        reads: 89894,
        tags: ['science', 'design', 'history']
      }
    ]
  },
  {
    posts: [
      {
        author: 'Tia Roberson',
        authorId: 2,
        id: 98,
        likes: 934,
        popularity: 0.5,
        reads: 17307,
        tags: ['design']
      }
    ]
  },
  {
    posts: [
      {
        author: 'Tia Roberson',
        authorId: 2,
        id: 99,
        likes: 473,
        popularity: 0.34,
        reads: 97868,
        tags: ['culture', 'startups', 'tech']
      }
    ]
  }
];

const mockPostSortByIdDescending = [
  {
    author: 'Ahmad Dunn',
    authorId: 7,
    id: 100,
    likes: 573,
    popularity: 0.43,
    reads: 89894,
    tags: ['science', 'design', 'history']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 99,
    likes: 473,
    popularity: 0.34,
    reads: 97868,
    tags: ['culture', 'startups', 'tech']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 98,
    likes: 934,
    popularity: 0.5,
    reads: 17307,
    tags: ['design']
  }
];

const mockPostSortByIdAscending = [
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 98,
    likes: 934,
    popularity: 0.5,
    reads: 17307,
    tags: ['design']
  },
  {
    author: 'Tia Roberson',
    authorId: 2,
    id: 99,
    likes: 473,
    popularity: 0.34,
    reads: 97868,
    tags: ['culture', 'startups', 'tech']
  },
  {
    author: 'Ahmad Dunn',
    authorId: 7,
    id: 100,
    likes: 573,
    popularity: 0.43,
    reads: 89894,
    tags: ['science', 'design', 'history']
  }
];

describe('PostService', function () {
  beforeEach(() => {
    nock(config.host).get(`/assessment/blog/posts?tag=tech`).reply(200, mockMultiplePosts);
  });

  it('can merge posts from different tags', async function () {
    const result = PostLibrary.mergeMultiplePost(mockMultiplePosts);
    expect(result).to.deep.equal(mockUnorderedPosts);
  });

  it('can remove duplicate post', async function () {
    const result = PostLibrary.removeDulplicatePost(mockDuplicatePosts);
    expect(result).to.deep.equal(mockUnorderedPosts);
  });

  it('can sort post by numeric keys and descending order', async function () {
    const result = mockUnorderedPosts.sort(PostLibrary.comparePostByKey('id', 'desc'));
    expect(result).to.deep.equal(mockPostSortByIdDescending);
  });

  it('can sort post by numeric keys and ascending order', async function () {
    const result = mockUnorderedPosts.slice().sort(PostLibrary.comparePostByKey('id', 'asc'));
    expect(result).to.deep.equal(mockPostSortByIdAscending);
  });

  it('can make multiple calls to get a posts', async function () {
    const result = await PostLibrary.getPostByTags(['tech']);
    expect(result).to.deep.equal([mockMultiplePosts]);
  });
});
