const HttpClient = require('../util/HttpClient');
const Config = require('../config/config.json');

module.exports = class Remote {
  constructor() {
    this.host = Config.host;
    this.headers = Config.headers;
    this.headers['Content-Type'] = 'application/json';
    this.instance = null;
  }
  async getPostByTags(tag) {
    try {
      let url = this.host + `/assessment/blog/posts?tag=${tag}`;
      return HttpClient.getRemoteCall(url, this.headers);
    } catch (error) {
      console.log(`Remote getPostByTags Error ${error.message || ''} - trace ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static getInstance() {
    return (this.instance) ? this.instance : (this.instance = new Remote());
  }
};
