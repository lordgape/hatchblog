const expect = require('chai').expect;
const nock = require('nock');
const config = require('../../src/config/config.json');

const PostLibrary = require('../../src/util/PostLibrary');

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

const mockPostByTech = {
  posts: [
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 1,
      likes: 960,
      popularity: 0.13,
      reads: 50361,
      tags: ['tech', 'health']
    },
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 2,
      likes: 469,
      popularity: 0.68,
      reads: 90406,
      tags: ['startups', 'tech', 'history']
    },
    {
      author: 'Elisha Friedman',
      authorId: 8,
      id: 4,
      likes: 728,
      popularity: 0.88,
      reads: 19645,
      tags: ['science', 'design', 'tech']
    },
    {
      author: 'Adalyn Blevins',
      authorId: 11,
      id: 12,
      likes: 590,
      popularity: 0.32,
      reads: 80351,
      tags: ['tech']
    },
    {
      author: 'Elisha Friedman',
      authorId: 8,
      id: 13,
      likes: 230,
      popularity: 0.31,
      reads: 64058,
      tags: ['design', 'tech']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 14,
      likes: 311,
      popularity: 0.67,
      reads: 25644,
      tags: ['tech', 'history']
    },
    {
      author: 'Lainey Ritter',
      authorId: 1,
      id: 15,
      likes: 560,
      popularity: 0.8,
      reads: 81549,
      tags: ['culture', 'startups', 'tech']
    },
    {
      author: 'Jaden Bryant',
      authorId: 3,
      id: 18,
      likes: 983,
      popularity: 0.09,
      reads: 33952,
      tags: ['tech', 'history']
    },
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 24,
      likes: 940,
      popularity: 0.74,
      reads: 89299,
      tags: ['culture', 'tech', 'politics']
    },
    {
      author: 'Elisha Friedman',
      authorId: 8,
      id: 25,
      likes: 365,
      popularity: 0.12,
      reads: 32949,
      tags: ['politics', 'tech']
    },
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 26,
      likes: 748,
      popularity: 0.75,
      reads: 28239,
      tags: ['tech']
    },
    {
      author: 'Kinley Crosby',
      authorId: 10,
      id: 35,
      likes: 868,
      popularity: 0.2,
      reads: 66926,
      tags: ['tech']
    },
    {
      author: 'Adalyn Blevins',
      authorId: 11,
      id: 37,
      likes: 107,
      popularity: 0.55,
      reads: 35946,
      tags: ['tech', 'health', 'history']
    },
    {
      author: 'Jon Abbott',
      authorId: 4,
      id: 43,
      likes: 149,
      popularity: 0.07,
      reads: 77776,
      tags: ['science', 'tech']
    },
    {
      author: 'Jon Abbott',
      authorId: 4,
      id: 46,
      likes: 89,
      popularity: 0.96,
      reads: 79298,
      tags: ['culture', 'tech']
    },
    {
      author: 'Jaden Bryant',
      authorId: 3,
      id: 51,
      likes: 487,
      popularity: 0.01,
      reads: 98798,
      tags: ['design', 'startups', 'tech']
    },
    {
      author: 'Bryson Bowers',
      authorId: 6,
      id: 54,
      likes: 723,
      popularity: 0.56,
      reads: 312,
      tags: ['culture', 'tech']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 58,
      likes: 466,
      popularity: 0.1,
      reads: 17389,
      tags: ['science', 'tech']
    },
    {
      author: 'Tia Roberson',
      authorId: 2,
      id: 59,
      likes: 971,
      popularity: 0.21,
      reads: 36154,
      tags: ['politics', 'tech']
    },
    {
      author: 'Lainey Ritter',
      authorId: 1,
      id: 76,
      likes: 122,
      popularity: 0.01,
      reads: 75771,
      tags: ['tech', 'health', 'politics']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 77,
      likes: 407,
      popularity: 0.21,
      reads: 664,
      tags: ['politics', 'startups', 'tech', 'science']
    },
    {
      author: 'Lainey Ritter',
      authorId: 1,
      id: 82,
      likes: 140,
      popularity: 0.09,
      reads: 3201,
      tags: ['tech']
    },
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 84,
      likes: 233,
      popularity: 0.65,
      reads: 17854,
      tags: ['politics', 'tech', 'history']
    },
    {
      author: 'Bryson Bowers',
      authorId: 6,
      id: 85,
      likes: 25,
      popularity: 0.18,
      reads: 16861,
      tags: ['tech']
    },
    {
      author: 'Adalyn Blevins',
      authorId: 11,
      id: 89,
      likes: 251,
      popularity: 0.6,
      reads: 75503,
      tags: ['politics', 'startups', 'tech', 'history']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 93,
      likes: 881,
      popularity: 0.41,
      reads: 73964,
      tags: ['tech', 'history']
    },
    {
      author: 'Jon Abbott',
      authorId: 4,
      id: 95,
      likes: 985,
      popularity: 0.42,
      reads: 55875,
      tags: ['politics', 'tech', 'health', 'history']
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
  ]
};

const mockPostByHealth = {
  posts: [
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 1,
      likes: 960,
      popularity: 0.13,
      reads: 50361,
      tags: ['tech', 'health']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 3,
      likes: 425,
      popularity: 0.68,
      reads: 11381,
      tags: ['startups', 'health']
    },
    {
      author: 'Bryson Bowers',
      authorId: 6,
      id: 5,
      likes: 44,
      popularity: 0.57,
      reads: 94293,
      tags: ['startups', 'health']
    },
    {
      author: 'Ahmad Dunn',
      authorId: 7,
      id: 7,
      likes: 499,
      popularity: 0.93,
      reads: 95434,
      tags: ['science', 'health']
    },
    {
      author: 'Elisha Friedman',
      authorId: 8,
      id: 10,
      likes: 853,
      popularity: 0.6,
      reads: 35913,
      tags: ['science', 'health', 'history']
    },
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 17,
      likes: 527,
      popularity: 0.88,
      reads: 52454,
      tags: ['science', 'health']
    },
    {
      author: 'Ahmad Dunn',
      authorId: 7,
      id: 27,
      likes: 324,
      popularity: 0.98,
      reads: 73428,
      tags: ['health']
    },
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 32,
      likes: 992,
      popularity: 0.84,
      reads: 32530,
      tags: ['health']
    },
    {
      author: 'Adalyn Blevins',
      authorId: 11,
      id: 34,
      likes: 670,
      popularity: 0.24,
      reads: 65450,
      tags: ['health']
    },
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 36,
      likes: 709,
      popularity: 0.08,
      reads: 65277,
      tags: ['health', 'design']
    },
    {
      author: 'Adalyn Blevins',
      authorId: 11,
      id: 37,
      likes: 107,
      popularity: 0.55,
      reads: 35946,
      tags: ['tech', 'health', 'history']
    },
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 41,
      likes: 715,
      popularity: 0.69,
      reads: 47876,
      tags: ['design', 'health']
    },
    {
      author: 'Kinley Crosby',
      authorId: 10,
      id: 47,
      likes: 852,
      popularity: 0.25,
      reads: 72023,
      tags: ['culture', 'health']
    },
    {
      author: 'Ahmad Dunn',
      authorId: 7,
      id: 48,
      likes: 201,
      popularity: 0.57,
      reads: 13867,
      tags: ['politics', 'health']
    },
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 50,
      likes: 898,
      popularity: 0.96,
      reads: 4923,
      tags: ['health', 'history']
    },
    {
      author: 'Elisha Friedman',
      authorId: 8,
      id: 52,
      likes: 602,
      popularity: 0.26,
      reads: 76359,
      tags: ['science', 'health']
    },
    {
      author: 'Ahmad Dunn',
      authorId: 7,
      id: 53,
      likes: 62,
      popularity: 0.62,
      reads: 68047,
      tags: ['politics', 'health']
    },
    {
      author: 'Elisha Friedman',
      authorId: 8,
      id: 56,
      likes: 319,
      popularity: 0.49,
      reads: 96864,
      tags: ['design', 'health', 'culture']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 60,
      likes: 52,
      popularity: 0.07,
      reads: 39800,
      tags: ['health']
    },
    {
      author: 'Ahmad Dunn',
      authorId: 7,
      id: 61,
      likes: 108,
      popularity: 0.51,
      reads: 5103,
      tags: ['startups', 'health']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 66,
      likes: 224,
      popularity: 0.05,
      reads: 20532,
      tags: ['health']
    },
    {
      author: 'Trevon Rodriguez',
      authorId: 5,
      id: 67,
      likes: 903,
      popularity: 0.71,
      reads: 26815,
      tags: ['health', 'history']
    },
    {
      author: 'Kinley Crosby',
      authorId: 10,
      id: 70,
      likes: 632,
      popularity: 0.6,
      reads: 15459,
      tags: ['startups', 'health']
    },
    {
      author: 'Jon Abbott',
      authorId: 4,
      id: 71,
      likes: 321,
      popularity: 0.69,
      reads: 29331,
      tags: ['culture', 'health', 'politics']
    },
    {
      author: 'Lainey Ritter',
      authorId: 1,
      id: 76,
      likes: 122,
      popularity: 0.01,
      reads: 75771,
      tags: ['tech', 'health', 'politics']
    },
    {
      author: 'Jon Abbott',
      authorId: 4,
      id: 78,
      likes: 539,
      popularity: 0.45,
      reads: 13562,
      tags: ['health']
    },
    {
      author: 'Zackery Turner',
      authorId: 12,
      id: 91,
      likes: 455,
      popularity: 0.19,
      reads: 90395,
      tags: ['science', 'health']
    },
    {
      author: 'Rylee Paul',
      authorId: 9,
      id: 92,
      likes: 203,
      popularity: 0.49,
      reads: 82099,
      tags: ['health']
    },
    {
      author: 'Jon Abbott',
      authorId: 4,
      id: 95,
      likes: 985,
      popularity: 0.42,
      reads: 55875,
      tags: ['politics', 'tech', 'health', 'history']
    }
  ]
};

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

const mockTechAndHealthPost = [
  {
    posts: [
      {
        author: 'Rylee Paul',
        authorId: 9,
        id: 1,
        likes: 960,
        popularity: 0.13,
        reads: 50361,
        tags: ['tech', 'health']
      },
      {
        author: 'Zackery Turner',
        authorId: 12,
        id: 2,
        likes: 469,
        popularity: 0.68,
        reads: 90406,
        tags: ['startups', 'tech', 'history']
      },
      {
        author: 'Elisha Friedman',
        authorId: 8,
        id: 4,
        likes: 728,
        popularity: 0.88,
        reads: 19645,
        tags: ['science', 'design', 'tech']
      },
      { author: 'Adalyn Blevins', authorId: 11, id: 12, likes: 590, popularity: 0.32, reads: 80351, tags: ['tech'] },
      {
        author: 'Elisha Friedman',
        authorId: 8,
        id: 13,
        likes: 230,
        popularity: 0.31,
        reads: 64058,
        tags: ['design', 'tech']
      },
      {
        author: 'Trevon Rodriguez',
        authorId: 5,
        id: 14,
        likes: 311,
        popularity: 0.67,
        reads: 25644,
        tags: ['tech', 'history']
      },
      {
        author: 'Lainey Ritter',
        authorId: 1,
        id: 15,
        likes: 560,
        popularity: 0.8,
        reads: 81549,
        tags: ['culture', 'startups', 'tech']
      },
      {
        author: 'Jaden Bryant',
        authorId: 3,
        id: 18,
        likes: 983,
        popularity: 0.09,
        reads: 33952,
        tags: ['tech', 'history']
      },
      {
        author: 'Zackery Turner',
        authorId: 12,
        id: 24,
        likes: 940,
        popularity: 0.74,
        reads: 89299,
        tags: ['culture', 'tech', 'politics']
      },
      {
        author: 'Elisha Friedman',
        authorId: 8,
        id: 25,
        likes: 365,
        popularity: 0.12,
        reads: 32949,
        tags: ['politics', 'tech']
      },
      { author: 'Zackery Turner', authorId: 12, id: 26, likes: 748, popularity: 0.75, reads: 28239, tags: ['tech'] },
      { author: 'Kinley Crosby', authorId: 10, id: 35, likes: 868, popularity: 0.2, reads: 66926, tags: ['tech'] },
      {
        author: 'Adalyn Blevins',
        authorId: 11,
        id: 37,
        likes: 107,
        popularity: 0.55,
        reads: 35946,
        tags: ['tech', 'health', 'history']
      },
      {
        author: 'Jon Abbott',
        authorId: 4,
        id: 43,
        likes: 149,
        popularity: 0.07,
        reads: 77776,
        tags: ['science', 'tech']
      },
      {
        author: 'Jon Abbott',
        authorId: 4,
        id: 46,
        likes: 89,
        popularity: 0.96,
        reads: 79298,
        tags: ['culture', 'tech']
      },
      {
        author: 'Jaden Bryant',
        authorId: 3,
        id: 51,
        likes: 487,
        popularity: 0.01,
        reads: 98798,
        tags: ['design', 'startups', 'tech']
      },
      {
        author: 'Bryson Bowers',
        authorId: 6,
        id: 54,
        likes: 723,
        popularity: 0.56,
        reads: 312,
        tags: ['culture', 'tech']
      },
      {
        author: 'Trevon Rodriguez',
        authorId: 5,
        id: 58,
        likes: 466,
        popularity: 0.1,
        reads: 17389,
        tags: ['science', 'tech']
      },
      {
        author: 'Tia Roberson',
        authorId: 2,
        id: 59,
        likes: 971,
        popularity: 0.21,
        reads: 36154,
        tags: ['politics', 'tech']
      },
      {
        author: 'Lainey Ritter',
        authorId: 1,
        id: 76,
        likes: 122,
        popularity: 0.01,
        reads: 75771,
        tags: ['tech', 'health', 'politics']
      },
      {
        author: 'Trevon Rodriguez',
        authorId: 5,
        id: 77,
        likes: 407,
        popularity: 0.21,
        reads: 664,
        tags: ['politics', 'startups', 'tech', 'science']
      },
      { author: 'Lainey Ritter', authorId: 1, id: 82, likes: 140, popularity: 0.09, reads: 3201, tags: ['tech'] },
      {
        author: 'Rylee Paul',
        authorId: 9,
        id: 84,
        likes: 233,
        popularity: 0.65,
        reads: 17854,
        tags: ['politics', 'tech', 'history']
      },
      { author: 'Bryson Bowers', authorId: 6, id: 85, likes: 25, popularity: 0.18, reads: 16861, tags: ['tech'] },
      {
        author: 'Adalyn Blevins',
        authorId: 11,
        id: 89,
        likes: 251,
        popularity: 0.6,
        reads: 75503,
        tags: ['politics', 'startups', 'tech', 'history']
      },
      {
        author: 'Trevon Rodriguez',
        authorId: 5,
        id: 93,
        likes: 881,
        popularity: 0.41,
        reads: 73964,
        tags: ['tech', 'history']
      },
      {
        author: 'Jon Abbott',
        authorId: 4,
        id: 95,
        likes: 985,
        popularity: 0.42,
        reads: 55875,
        tags: ['politics', 'tech', 'health', 'history']
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
    ]
  },
  {
    posts: [
      {
        author: 'Rylee Paul',
        authorId: 9,
        id: 1,
        likes: 960,
        popularity: 0.13,
        reads: 50361,
        tags: ['tech', 'health']
      },
      {
        author: 'Trevon Rodriguez',
        authorId: 5,
        id: 3,
        likes: 425,
        popularity: 0.68,
        reads: 11381,
        tags: ['startups', 'health']
      },
      {
        author: 'Bryson Bowers',
        authorId: 6,
        id: 5,
        likes: 44,
        popularity: 0.57,
        reads: 94293,
        tags: ['startups', 'health']
      },
      {
        author: 'Ahmad Dunn',
        authorId: 7,
        id: 7,
        likes: 499,
        popularity: 0.93,
        reads: 95434,
        tags: ['science', 'health']
      },
      {
        author: 'Elisha Friedman',
        authorId: 8,
        id: 10,
        likes: 853,
        popularity: 0.6,
        reads: 35913,
        tags: ['science', 'health', 'history']
      },
      {
        author: 'Rylee Paul',
        authorId: 9,
        id: 17,
        likes: 527,
        popularity: 0.88,
        reads: 52454,
        tags: ['science', 'health']
      },
      { author: 'Ahmad Dunn', authorId: 7, id: 27, likes: 324, popularity: 0.98, reads: 73428, tags: ['health'] },
      { author: 'Zackery Turner', authorId: 12, id: 32, likes: 992, popularity: 0.84, reads: 32530, tags: ['health'] },
      { author: 'Adalyn Blevins', authorId: 11, id: 34, likes: 670, popularity: 0.24, reads: 65450, tags: ['health'] },
      {
        author: 'Rylee Paul',
        authorId: 9,
        id: 36,
        likes: 709,
        popularity: 0.08,
        reads: 65277,
        tags: ['health', 'design']
      },
      {
        author: 'Adalyn Blevins',
        authorId: 11,
        id: 37,
        likes: 107,
        popularity: 0.55,
        reads: 35946,
        tags: ['tech', 'health', 'history']
      },
      {
        author: 'Rylee Paul',
        authorId: 9,
        id: 41,
        likes: 715,
        popularity: 0.69,
        reads: 47876,
        tags: ['design', 'health']
      },
      {
        author: 'Kinley Crosby',
        authorId: 10,
        id: 47,
        likes: 852,
        popularity: 0.25,
        reads: 72023,
        tags: ['culture', 'health']
      },
      {
        author: 'Ahmad Dunn',
        authorId: 7,
        id: 48,
        likes: 201,
        popularity: 0.57,
        reads: 13867,
        tags: ['politics', 'health']
      },
      {
        author: 'Zackery Turner',
        authorId: 12,
        id: 50,
        likes: 898,
        popularity: 0.96,
        reads: 4923,
        tags: ['health', 'history']
      },
      {
        author: 'Elisha Friedman',
        authorId: 8,
        id: 52,
        likes: 602,
        popularity: 0.26,
        reads: 76359,
        tags: ['science', 'health']
      },
      {
        author: 'Ahmad Dunn',
        authorId: 7,
        id: 53,
        likes: 62,
        popularity: 0.62,
        reads: 68047,
        tags: ['politics', 'health']
      },
      {
        author: 'Elisha Friedman',
        authorId: 8,
        id: 56,
        likes: 319,
        popularity: 0.49,
        reads: 96864,
        tags: ['design', 'health', 'culture']
      },
      { author: 'Trevon Rodriguez', authorId: 5, id: 60, likes: 52, popularity: 0.07, reads: 39800, tags: ['health'] },
      {
        author: 'Ahmad Dunn',
        authorId: 7,
        id: 61,
        likes: 108,
        popularity: 0.51,
        reads: 5103,
        tags: ['startups', 'health']
      },
      { author: 'Trevon Rodriguez', authorId: 5, id: 66, likes: 224, popularity: 0.05, reads: 20532, tags: ['health'] },
      {
        author: 'Trevon Rodriguez',
        authorId: 5,
        id: 67,
        likes: 903,
        popularity: 0.71,
        reads: 26815,
        tags: ['health', 'history']
      },
      {
        author: 'Kinley Crosby',
        authorId: 10,
        id: 70,
        likes: 632,
        popularity: 0.6,
        reads: 15459,
        tags: ['startups', 'health']
      },
      {
        author: 'Jon Abbott',
        authorId: 4,
        id: 71,
        likes: 321,
        popularity: 0.69,
        reads: 29331,
        tags: ['culture', 'health', 'politics']
      },
      {
        author: 'Lainey Ritter',
        authorId: 1,
        id: 76,
        likes: 122,
        popularity: 0.01,
        reads: 75771,
        tags: ['tech', 'health', 'politics']
      },
      { author: 'Jon Abbott', authorId: 4, id: 78, likes: 539, popularity: 0.45, reads: 13562, tags: ['health'] },
      {
        author: 'Zackery Turner',
        authorId: 12,
        id: 91,
        likes: 455,
        popularity: 0.19,
        reads: 90395,
        tags: ['science', 'health']
      },
      { author: 'Rylee Paul', authorId: 9, id: 92, likes: 203, popularity: 0.49, reads: 82099, tags: ['health'] },
      {
        author: 'Jon Abbott',
        authorId: 4,
        id: 95,
        likes: 985,
        popularity: 0.42,
        reads: 55875,
        tags: ['politics', 'tech', 'health', 'history']
      }
    ]
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
    nock(config.host).get(`/assessment/blog/posts?tag=tech`).reply(200, mockPostByTech);
    nock(config.host).get(`/assessment/blog/posts?tag=health`).reply(200, mockPostByHealth);
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
    const result = await PostLibrary.getPostByTags(['tech', 'health']);
    expect(result).to.deep.equal(mockTechAndHealthPost);
  });
});
