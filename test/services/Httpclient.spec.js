const expect = require('chai').expect;
const nock = require('nock');

const Httpclient = require('../../util/HttpClient');

const baseURL = 'http://www.example.com';
const payload = { tag: 'admin', access: 12345 };
const successPost = { success: 'Created' };
const failedPost = { error: 'Failed' };
const expectedFailedResult = { body: { error: 'Failed' }, statusCode: 400 };
const headers = {
  'Content-type': 'application/json; charset=UTF-8'
};

describe('HttpClient', function () {
  beforeEach(() => {
    nock(baseURL).post('/posts', payload).reply(200, successPost);
    nock(baseURL).post('/failed', payload).reply(400, failedPost);
    nock(baseURL).get('/failed/get').reply(400, failedPost);
  });

  it('can make success http posts call', async function () {
    const result = await Httpclient.postRemoteCall('http://www.example.com/posts', headers, payload);
    expect(result).to.deep.equal(successPost);
  });

  it('Handle failed http posts call', async function () {
    try {
      await Httpclient.postRemoteCall('http://www.example.com/failed', headers, payload);
    } catch (error) {
      expect(error).to.deep.equal(expectedFailedResult);
    }
  });

  it('Handle failed http get call', async function () {
    try {
      await Httpclient.getRemoteCall('http://www.example.com/failed/get', headers);
    } catch (error) {
      expect(error).to.deep.equal(expectedFailedResult);
    }
  });
});
